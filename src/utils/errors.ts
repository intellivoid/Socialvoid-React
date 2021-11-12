import { ProviderContext } from 'notistack'
import { ZodError, defaultErrorMap, setErrorMap } from 'zod'

import { RouteProps } from '../types'

setErrorMap((issue, _ctx) => {
  let path = issue.path[0].toString()

  path = path.charAt(0).toUpperCase() + path.slice(1)

  if (
    (issue.code === 'too_small' && issue.minimum === 1) ||
    (issue.code === 'invalid_type' && issue.received === undefined)
  ) {
    return { message: `${path} is empty.` }
  }

  return defaultErrorMap(issue, _ctx)
})

export function handleZodErrors(func: () => void, snackbar: ProviderContext) {
  try {
    func()
  } catch (err) {
    if (!(err instanceof ZodError)) {
      throw err
    }

    const flatten = err.flatten()
    const fieldErrors = Object.values(flatten.fieldErrors)

    if (fieldErrors.length !== 0) {
      snackbar.enqueueSnackbar(fieldErrors[0][0], {
        variant: 'warning',
        preventDuplicate: true,
      })
    }
  }
}
