import { useEffect } from 'react'

import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'

import { useSnackbar } from 'notistack'
import { z } from 'zod'

import { dispatch } from '../../socialvoid'
import { spassword } from '../../specifications'
import { handleZodErrors } from '../../utilities/errors'
import { redirectIfAuthenticated } from '../../utilities/redirect'

export default function SignUp() {
  const router = useRouter()
  const snackbar = useSnackbar()

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    handleZodErrors(() => {
      event.preventDefault()
      const data = new FormData(event.currentTarget)

      const params = z
        .object({
          tosId: z.string().nonempty(),
          username: z.string().nonempty(),
          password: spassword,
          passwordConfirmation: z.string(),
          firstName: z.string().nonempty(),
          lastName: z.string().optional(),
        })
        .parse({
          tosId: router.query.tosId,
          username: data.get('username'),
          password: data.get('password'),
          passwordConfirmation: data.get('passwordConfirmation'),
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
        })

      if (params.password !== params.passwordConfirmation) {
        snackbar.enqueueSnackbar('Passwords don’t match.', {
          variant: 'warning',
          preventDuplicate: true,
        })
        return
      }

      dispatch(async (client) => {
        await client.newSession()

        await client.session.register(
          params.tosId,
          params.username,
          params.password,
          params.firstName,
          params.lastName
        )

        await client.session.authenticateUser(params.username, params.password)

        snackbar.enqueueSnackbar('Signed up successfully.', {
          variant: 'success',
        })

        router.replace('/')
      }, snackbar)
    }, snackbar)
  }

  useEffect(() => {
    redirectIfAuthenticated(router)
  })

  return (
    <Box component="form" onSubmit={submit} sx={{ mt: 3 }} noValidate>
      <TextField
        required
        fullWidth
        id="firstName"
        label="First name"
        name="firstName"
        autoComplete="off"
        autoFocus
      />
      <TextField
        fullWidth
        id="lastName"
        label="Last name"
        name="lastName"
        autoComplete="off"
        sx={{ mt: 3 }}
      />
      <TextField
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="off"
        sx={{ mt: 3 }}
      />
      <TextField
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        type="password"
        autoComplete="off"
        sx={{ mt: 3 }}
      />
      <TextField
        required
        fullWidth
        id="passwordConfirmation"
        label="Confirm password"
        name="passwordConfirmation"
        type="password"
        autoComplete="off"
        sx={{ mt: 3 }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 3 }}>
        Sign Up
      </Button>
      <Link href="/signin" variant="body2" sx={{ float: 'right' }}>
        Already have an account?
      </Link>
    </Box>
  )
}
