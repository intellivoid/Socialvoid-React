import { Component } from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Checkbox,
  Box,
  Typography,
  FormControlLabel,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { HelpDocument } from "socialvoid"
import { dispatch } from "../socialvoid"
import { unparse, stringParameter } from "../utils"
import { RouteProps } from "../types"

class ToSC extends Component<
  RouteProps,
  { document: HelpDocument; disabled: boolean }
> {
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
        "/signup?" + encodeURIComponent(stringParameter(data.get("tosId")!)),
        { replace: true }
      )
    }

    return (
      <>
        <Typography
          variant="body1"
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

  componentDidMount() {
    dispatch(
      async (client) => {
        const document = await client.help.getTermsOfService()
        this.setState({ document, disabled: false })
      },
      { ...this.props, requireToBeNotAuthenticated: true }
    )
  }
}

export default function ToS() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()

  return <ToSC navigate={navigate} snackbar={snackbar} />
}
