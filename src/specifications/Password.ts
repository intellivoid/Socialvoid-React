import { z } from 'zod'

const Password = z
  .string({ required_error: 'Password is required.' })
  // .min(12, "The password should be 12 characters at least.")
  .max(128, 'The password can’t be longer than 128 characters.')
  .regex(/.*[A-Z].*/, 'The password should contain a capital letter.')
  .regex(/.*[0-9].*[0-9].*/, 'The password should contain 2 numbers at least.')

export default Password
