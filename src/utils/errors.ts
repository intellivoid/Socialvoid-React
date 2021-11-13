import { ProviderContext } from 'notistack'
import { ZodError, defaultErrorMap, setErrorMap } from 'zod'

function camelToNormal(s: string) {
  const chars = new Array<string>()

  for (const char of s) {
    if (char === char.toUpperCase()) {
      if (chars.length === 0) {
        chars.push(char)
      } else {
        chars.push(' ')
        chars.push(char.toLowerCase())
      }
    } else {
      chars.push(char)
    }
  }

  return chars.join('')
}

setErrorMap((issue, _ctx) => {
  let path = issue.path[0].toString()

  path = path.charAt(0).toUpperCase() + path.slice(1)

  if (
    (issue.code === 'too_small' && issue.minimum === 1) ||
    (issue.code === 'invalid_type' && issue.received === 'undefined')
  ) {
    return { message: `${camelToNormal(path)} is empty.` }
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
