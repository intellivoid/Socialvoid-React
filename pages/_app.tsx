import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import Loading from "../components/Loading";
import { useLoadingState, loadingStore } from "../stores";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { loading, key } = useLoadingState();

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

  useEffect(() => {
    const handleRouteChangeStart = () => {
      loadingStore.update((state) => ({
        ...state,
        loading: true,
        key: state.key ^ 1,
      }));
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Container component="main" maxWidth="md">
          <Loading loading={loading} key={key} />
          <Component {...pageProps} />
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
