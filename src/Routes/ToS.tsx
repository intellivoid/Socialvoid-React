import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Typography from "@mui/material/Typography"
import { useSnackbar } from "notistack"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { HelpDocument } from "socialvoid"
import { z } from "zod"

import { dispatch } from "../socialvoid"
import { RouteProps } from "../types"
import { redirectIfAuthenticated, unparse } from "../utils"

class Component extends React.Component<
  RouteProps,
  { document: HelpDocument; disabled: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = {
      document: { id: "", text: "Loading...", entities: [] },
      disabled: true,
    }
  }

  componentDidMount() {
    dispatch(
      async (client) => {
        const document = await client.help.getTermsOfService()
        this.setState({ document, disabled: false })
      },
      { ...this.props }
    )
  }

  render() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget)

      if (data.get("acceptTermOfServices") !== "on") {
        this.props.snackbar.enqueueSnackbar("You must read and accept.", {
          variant: "info",
          preventDuplicate: true,
        })
        return
      }

      this.props.snackbar.closeSnackbar()

      this.props.navigate(
        "/signup?" + encodeURIComponent(z.string().parse(data.get("tosId")!)),
        { replace: true }
      )
    }

    return (
      <>
        <Typography
          variant="body1"
          sx={{ mt: 3 }}
          dangerouslySetInnerHTML={{
            __html: unparse(
              this.state.document.text,
              this.state.document.entities
            ),
          }}
        ></Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <input type="hidden" name="tosId" value={this.state.document.id} />
          <FormControlLabel
            control={
              <Checkbox
                name="acceptTermOfServices"
                color="primary"
                disabled={this.state.disabled}
              />
            }
            label="I have read and accepted."
          />
          <Button
            type="submit"
            variant="contained"
            disabled={this.state.disabled}
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Next
          </Button>
        </Box>
      </>
    )
  }
}

export default function ToS() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  useEffect(() => {
    redirectIfAuthenticated(navigate)
  })

  return <Component navigate={navigate} snackbar={snackbar} />
}
