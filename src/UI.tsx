import React from 'react'

import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import useMediaQuery from '@mui/material/useMediaQuery'

import { SnackbarProvider } from 'notistack'

import Bar from './components/Bar'

export default function UI({ children }: any) {
  const dark = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () => createTheme({ palette: { mode: dark ? 'dark' : 'light' } }),
    [dark]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Container component="main" maxWidth="sm">
          <Bar />
          {children}
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
