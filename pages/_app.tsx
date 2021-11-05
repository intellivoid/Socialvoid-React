import { useMemo } from "react";
import { AppProps } from "next/app";
import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
  Container,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import Header from "../components/Header";

function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Container component="main" maxWidth="sm" sx={{ mt: 3 }}>
          <Component {...pageProps} />
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
