import { Client, errors } from "socialvoid";
import { NextRouter } from "next/router";
import { ProviderContext } from "notistack";
import { authenticated, client } from "../client";
import { runOnClient } from "./client";

export const dispatch = (
  func: (client: Client) => Promise<void> | void,
  router: NextRouter,
  snackbar: ProviderContext,
  options?: {
    requireToBeAuthenticated?: boolean;
    requireToBeNotAuthenticated?: boolean;
  },
) => {
  if (
    options?.requireToBeAuthenticated && options.requireToBeNotAuthenticated
  ) {
    throw new Error("Invalid options");
  }

  runOnClient(async () => {
    try {
      if (options?.requireToBeAuthenticated) {
        if (!await authenticated()) {
          router.push("/signin");
          return;
        }
      } else if (options?.requireToBeNotAuthenticated) {
        if (await authenticated()) {
          router.push("/");
          return;
        }
      }

      await func(client);
    } catch (err) {
      if (err instanceof errors.SocialvoidError) {
        snackbar.enqueueSnackbar(err.errorMessage, {
          variant: "error",
          preventDuplicate: true,
        });
      } else {
        console.error(err);
        snackbar.enqueueSnackbar("An unexpected error occurred.", {
          variant: "error",
          preventDuplicate: true,
        });
      }
    }
  });
};
