import { Client, errors } from "socialvoid";
import { NextRouter } from "next/router";
import { ProviderContext } from "notistack";
import { authenticated, client } from "../client";

export const validatePassword = (password: string) => {
  if (password.length < 12) {
    return "is too short";
  }

  if (password.length > 128) {
    return "is too long";
  }

  let numberCount = 0;

  for (const char of password) {
    if (!isNaN(Number(char))) {
      numberCount++;
    }
  }

  if (numberCount < 2) {
    return "should contain at least 2 numbers";
  }

  return true;
};

export const stringParameter = (value: FormDataEntryValue): string => {
  return value as string;
};

export const oStringParameter = (
  value: FormDataEntryValue | null,
): string | undefined => {
  return value == null ? undefined : value as string;
};

export const runOnClient = (func: () => Promise<void> | void) => {
  if (typeof window !== "undefined") {
    if (window.document.readyState == "loading") {
      window.addEventListener("load", () => func());
    } else {
      func();
    }
  }
};

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

export const pushWithQuery = (
  router: NextRouter,
  url: string,
  query: any,
) => {
  const pathname = url;

  router.push({ pathname, query }, { pathname, query });
};
