import { NavigateFunction } from "react-router-dom"

import { ProviderContext } from "notistack"

import { Client, errors } from "socialvoid"

export const client = new Client()

export const dispatch = async (
  func: (client: Client) => Promise<void> | void,
  opts: {
    navigate: NavigateFunction
    snackbar: ProviderContext
    requireToBeAuthenticated?: boolean
    requireToBeNotAuthenticated?: boolean
  }
) => {
  const navigate = opts.navigate,
    snackbar = opts.snackbar

  if (opts?.requireToBeAuthenticated && opts.requireToBeNotAuthenticated) {
    throw new Error("Invalid options")
  }

  try {
    if (opts?.requireToBeAuthenticated) {
      if (!client.sessionExists) {
        navigate("/signin")
        return
      }
    } else if (opts?.requireToBeNotAuthenticated) {
      if (client.sessionExists) {
        navigate("/", { replace: true })
        return
      }
    }

    await func(client)
  } catch (err) {
    if (err instanceof errors.SocialvoidError) {
      if (
        err instanceof errors.SessionExpired ||
        err instanceof errors.SessionNotFound ||
        err instanceof errors.BadSessionChallengeAnswer ||
        err instanceof errors.InvalidSessionIdentification
      ) {
        client.deleteSession()
        snackbar.enqueueSnackbar("Session expired.", {
          variant: "error",
          preventDuplicate: true,
        })
        return
      }

      snackbar.enqueueSnackbar(
        err.errorMessage.endsWith(".")
          ? err.errorMessage
          : err.errorMessage + ".",
        {
          variant: "error",
          preventDuplicate: true,
        }
      )
    } else {
      if (err instanceof Error) {
        switch (err.message) {
          case "Session does not exist":
            navigate("/signin")
            return
        }
      }
    }
  }
}
