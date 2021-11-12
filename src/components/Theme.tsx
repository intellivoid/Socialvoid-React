import React from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import useMediaQuery from '@mui/material/useMediaQuery'

import { SnackbarProvider } from 'notistack'

export default function Theme({ children }: { children: React.ReactNode }) {
  const dark = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () => createTheme({ palette: { mode: dark ? 'dark' : 'light' } }),
    [dark]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  )
}
