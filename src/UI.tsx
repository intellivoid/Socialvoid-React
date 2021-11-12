import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material"
import { SnackbarProvider } from "notistack"
import { useMemo } from "react"

import Bar from "./components/Bar"

export default function UI({ children }: any) {
  const dark = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = useMemo(
    () => createTheme({ palette: { mode: dark ? "dark" : "light" } }),
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
