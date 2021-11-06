import { useMemo } from "react";
import {
  useMediaQuery,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Bar } from "./components";

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
        <Container component="main" maxWidth="sm" sx={{ mt: 12 }}>
          <Bar />
          {children}
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
