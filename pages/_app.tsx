import React from "react";
import { AppProps } from "next/app";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import Copyright from "../components/copyright";

function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
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
        <Container component="main" maxWidth="md">
          <Component {...pageProps} />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
