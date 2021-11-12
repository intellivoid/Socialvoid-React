import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import { useSnackbar } from "notistack"
import React from "react"
import { useNavigate } from "react-router"
import { z } from "zod"

import { dispatch } from "../socialvoid"
import { Password } from "../specifications"
import { RouteProps } from "../types"
import { handleZodErrors } from "../utils"

class Component extends React.Component<RouteProps> {
  submit(event: React.FormEvent<HTMLFormElement>) {
    handleZodErrors(() => {
      event.preventDefault() // prevent the browser from reloading the page

      const data = new FormData(event.currentTarget)

      const { username, password } = z
        .object({
          username: z.string().nonempty(),
          password: Password,
        })
        .parse({
          username: data.get("username"),
          password: data.get("password"),
        })

      dispatch(
        async (client) => {
          await client.newSession()
          await client.session.authenticateUser(username, password)
          this.props.navigate("/")
        },
        { ...this.props }
      )
    }, this.props)
  }

  componentDidMount() {
    dispatch(() => {}, {
      ...this.props,
      requireToBeNotAuthenticated: true,
    })
  }

  render() {
    return (
      <Box
        component="form"
        onSubmit={this.submit.bind(this)}
        sx={{ mt: 3 }}
        noValidate
      >
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Link href="/signup" variant="body2" sx={{ float: "right" }}>
          Don’t have an account?
        </Link>
      </Box>
    )
  }
}

export default function SignUp() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  return <Component navigate={navigate} snackbar={snackbar} />
}
