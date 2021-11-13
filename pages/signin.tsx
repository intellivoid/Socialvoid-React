import { useEffect } from 'react'

import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'

import { useSnackbar } from 'notistack'
import { z } from 'zod'

import { dispatch } from '../socialvoid'
import { spassword } from '../specifications'
import { handleZodErrors } from '../utilities/errors'
import { redirectIfAuthenticated } from '../utilities/redirect'

export default function SignUp() {
  const router = useRouter()
  const snackbar = useSnackbar()

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    handleZodErrors(() => {
      event.preventDefault()

      const data = new FormData(event.currentTarget)

      const { username, password } = z
        .object({
          username: z.string().nonempty(),
          password: spassword,
        })
        .parse({
          username: data.get('username'),
          password: data.get('password'),
        })

      dispatch(async (client) => {
        await client.newSession()
        await client.session.authenticateUser(username, password)

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
        id="username"
        label="Username"
        name="username"
        autoComplete="off"
        autoFocus
        sx={{ mb: 3 }}
      />
      <TextField
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        type="password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 3 }}>
        Sign In
      </Button>
      <Link href="/signup" variant="body2" sx={{ float: 'right' }}>
        Don’t have an account?
      </Link>
    </Box>
  )
}
