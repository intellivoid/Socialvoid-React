import { ProviderContext } from 'notistack'
import { Client, errors } from 'socialvoid'

export const client = new Client()

export async function dispatch(
  func: (client: Client) => Promise<void> | void,
  snackbar?: ProviderContext
) {
  try {
    await func(client)
  } catch (err) {
    if (err instanceof errors.SocialvoidError) {
      if (
        err instanceof errors.SessionExpired ||
        err instanceof errors.BadSessionChallengeAnswer ||
        err instanceof errors.InvalidSessionIdentification
      ) {
        client.deleteSession()

        if (snackbar) {
          snackbar.enqueueSnackbar('Session expired.', {
            variant: 'error',
            preventDuplicate: true,
          })
        }
        return
      }

      if (snackbar) {
        snackbar.enqueueSnackbar(
          err.errorMessage.endsWith('.')
            ? err.errorMessage
            : err.errorMessage + '.',
          {
            variant: 'error',
            preventDuplicate: true,
          }
        )
      }
    } else {
      if (err instanceof Error) {
        switch (err.message) {
          case 'Session does not exist':
            break
        }
      }
    }
  }
}
