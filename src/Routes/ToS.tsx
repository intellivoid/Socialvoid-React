import { useEffect, useState } from 'react'
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
import { unparse } from '../utils/parser'
import { redirectIfAuthenticated } from '../utils/redirect'

export default function ToS() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const [document, setDocument] = useState<HelpDocument>()

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (data.get('acceptTermOfServices') !== 'on') {
      snackbar.enqueueSnackbar('You must read and accept.', {
        variant: 'info',
        preventDuplicate: true,
      })
      return
    }

    snackbar.closeSnackbar()

    navigate(
      '/signup?tosId=' +
        encodeURIComponent(z.string().parse(data.get('tosId')!)),
      { replace: true }
    )
  }

  useEffect(() => {
    redirectIfAuthenticated(navigate)

    dispatch(async (client) => {
      setDocument(await client.help.getTermsOfService())
    }, snackbar)
  })

  return document ? (
    <>
      <Typography
        variant="body1"
        sx={{ mt: 3 }}
        dangerouslySetInnerHTML={{
          __html: unparse(document.text, document.entities),
        }}
      ></Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={submit}>
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
