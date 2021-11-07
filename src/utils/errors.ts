import { ZodError } from "zod"
import { RouteProps } from "../types"

export function handleZodErrors(func: () => void, props: RouteProps) {
  try {
    func()
  } catch (err) {
    if (!(err instanceof ZodError)) {
      throw err
    }

    const flatten = err.flatten()
    const fieldErrors = Object.entries(flatten.fieldErrors)

    if (fieldErrors.length !== 0) {
      const [key, error] = fieldErrors[0]

      const message =
        error[0] == "Required"
          ? `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`
          : error[0]

      props.snackbar.enqueueSnackbar(message, {
        variant: "warning",
        preventDuplicate: true,
      })
    }
  }
}
