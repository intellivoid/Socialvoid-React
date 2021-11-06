import { useMemo } from "react"
import { useLocation } from "react-router"
import {
  useMediaQuery,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material"
import { SnackbarProvider } from "notistack"
import { Bar } from "./components"
import { titles } from "./Routes"

export default function UI({ children }: any) {
  const location = useLocation()
  const dark = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = useMemo(
    () => createTheme({ palette: { mode: dark ? "dark" : "light" } }),
    [dark]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Container component="main" maxWidth="sm" sx={{ mt: 12 }}>
          <Bar routeTitle={titles[location.pathname]} />
          {children}
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
