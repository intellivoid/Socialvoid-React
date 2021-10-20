import { Client, errors } from "socialvoid";
import { NextRouter } from "next/router";
import { ProviderContext } from "notistack";
import { authenticated, client } from "../client";
import { runOnClient } from "./client";
import { setLoading } from "../stores";

export const dispatch = (
  func: (client: Client) => Promise<void> | void,
  router: NextRouter,
  snackbar: ProviderContext,
  options?: {
    requireToBeAuthenticated?: boolean;
    requireToBeNotAuthenticated?: boolean;
    stopLoading?: boolean;
  }
) => {
  if (
    options?.requireToBeAuthenticated &&
    options.requireToBeNotAuthenticated
  ) {
    throw new Error("Invalid options");
  }

  runOnClient(async () => {
    try {
      if (options?.requireToBeAuthenticated) {
        if (!(await authenticated())) {
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

      if (options?.stopLoading) {
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof errors.SocialvoidError) {
        snackbar.enqueueSnackbar(
          err.errorMessage.endsWith(".")
            ? err.errorMessage
            : err.errorMessage + ".",
          {
            variant: "error",
            preventDuplicate: true,
          }
        );
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
