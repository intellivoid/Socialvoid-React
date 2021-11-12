import { Button, Link, TextField } from "@mui/material"
import { useSnackbar } from "notistack"
import React from "react"
import { useLocation, useNavigate } from "react-router"
import { z } from "zod"

import { dispatch } from "../socialvoid"
import { Password } from "../specifications"
import { RouteProps } from "../types"
import { handleZodErrors } from "../utils"

class Component extends React.Component<RouteProps> {
  submit(event: React.FormEvent<HTMLFormElement>) {
    handleZodErrors(() => {
      event.preventDefault()
      const data = new FormData(event.currentTarget)

      const params = z
        .object({
          tosId: z.string().nonempty(),
          username: z.string().nonempty(),
          password: Password,
          firstName: z.string().nonempty(),
          lastName: z.string().optional(),
        })
        .parse({
          tosId: this.props.query?.tosId,
          username: data.get("username"),
          password: data.get("password"),
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
        })

      dispatch(
        async (client) => {
          await client.newSession()

          await client.session.register(
            params.tosId,
            params.username,
            params.password,
            params.firstName,
            params.lastName
          )

          await client.session.authenticateUser(
            params.username,
            params.password
          )

          this.props.snackbar.enqueueSnackbar("Signed up successfully.", {
            variant: "success",
          })

          this.props.navigate("/", { replace: true })
        },
        { ...this.props }
      )
    }, this.props)
  }

  componentDidMount() {
    dispatch(
      () => {
        if (!this.props.query?.tosId) {
          this.props.navigate("/tos", { replace: true })
        }
      },
      { ...this.props, requireToBeNotAuthenticated: true }
    )
  }

  render() {
    return (
      <form noValidate onSubmit={(event) => this.submit(event)}>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Link href="/signin" variant="body2" sx={{ float: "right" }}>
          Already have an account?
        </Link>
      </form>
    )
  }
}

export default function SignUp() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  const query = Object.fromEntries(
    new URLSearchParams(useLocation().search).entries()
  )

  return <Component navigate={navigate} snackbar={snackbar} query={query} />
}
