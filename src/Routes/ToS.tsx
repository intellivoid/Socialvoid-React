import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

import { useSnackbar } from 'notistack'
import { HelpDocument } from 'socialvoid'
import { z } from 'zod'

import Loader from '../components/Loader'
import { dispatch } from '../socialvoid'
import { RouteProps } from '../types'
import { unparse } from '../utils/parser'
import { redirectIfAuthenticated } from '../utils/redirect'

class Component extends React.Component<
  RouteProps,
  { document?: HelpDocument; ready: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = {
      ready: false,
    }
  }

  submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (data.get('acceptTermOfServices') !== 'on') {
      this.props.snackbar.enqueueSnackbar('You must read and accept.', {
        variant: 'info',
        preventDuplicate: true,
      })
      return
    }

    this.props.snackbar.closeSnackbar()

    this.props.navigate(
      '/signup?tosId=' +
        encodeURIComponent(z.string().parse(data.get('tosId')!)),
      { replace: true }
    )
  }

  componentDidMount() {
    dispatch(
      async (client) => {
        const document = await client.help.getTermsOfService()
        this.setState({ document, ready: true })
      },
      { ...this.props }
    )
  }

  ready(_document?: HelpDocument): _document is HelpDocument {
    return this.state.ready
  }

  render() {
    const document = this.state.document

    return this.ready(document) ? (
      <>
        <Typography
          variant="body1"
          sx={{ mt: 3 }}
          dangerouslySetInnerHTML={{
            __html: unparse(document.text, document.entities),
          }}
        ></Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={this.submit.bind(this)}
        >
          <input type="hidden" name="tosId" value={document.id} />
          <FormControlLabel
            control={<Checkbox name="acceptTermOfServices" color="primary" />}
            label="I have read and accepted."
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Next
          </Button>
        </Box>
      </>
    ) : (
      <Loader />
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
