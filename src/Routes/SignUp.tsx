import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from "notistack"
import { dispatch } from "../socialvoid"
import { Button, TextField, Link } from "@mui/material"
import { stringParameter, oStringParameter, validatePassword } from "../utils"

export default function SignUp() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const params = useParams()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    let tosId = params.tosId,
      username = data.get("username"),
      password = data.get("password"),
      firstName = data.get("firstName"),
      lastName = data.get("lastName")

    dispatch(
      async (client) => {
        if (!tosId || !username || !password || !firstName) {
          snackbar.enqueueSnackbar("Invalid inputs.", {
            variant: "warning",
            preventDuplicate: true,
          })
          return
        }

        const passwordValid = validatePassword(stringParameter(password))

        if (passwordValid !== true) {
          snackbar.enqueueSnackbar("The password " + passwordValid + ".", {
            variant: "info",
            preventDuplicate: true,
          })
          return
        }

        await client.newSession()

        await client.session.register(
          stringParameter(tosId),
          stringParameter(username),
          stringParameter(password),
          stringParameter(firstName),
          oStringParameter(lastName)
        )

        await client.session.authenticateUser(
          username as string,
          password as string
        )

        snackbar.enqueueSnackbar("Signed up successfully.", {
          variant: "success",
        })

        navigate("/")
      },
      { navigate, snackbar }
    )
  }

  dispatch(
    (_) => {
      const tosId = params.tosId
      console.log(params)

      if (typeof tosId === "undefined") {
        navigate("/tos", { replace: true })
        return
      }
    },
    { navigate, snackbar, requireToBeNotAuthenticated: true }
  )

  return (
    <form noValidate onSubmit={handleSubmit}>
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Link href="/signin" variant="body2" sx={{ float: "right" }}>
        Already have an account?
      </Link>
    </form>
  )
}
