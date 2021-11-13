import { useMemo } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { SnackbarProvider } from 'notistack'

export default function Theme({ children }: { children: React.ReactNode }) {
  const dark = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
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
