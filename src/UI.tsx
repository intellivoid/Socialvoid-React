import { useMemo } from "react";
import {
  useMediaQuery,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import Header from "./components/Header";

export default function UI({ children }: any) {
  const dark = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () => createTheme({ palette: { mode: dark ? "dark" : "light" } }),
    [dark]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Header />
        <Container component="main" maxWidth="sm" sx={{ mt: 12 }}>
          {children}
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
