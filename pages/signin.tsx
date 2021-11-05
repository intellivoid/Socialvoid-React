import * as React from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { dispatch } from "../utils";

export default function Authenticate() {
  const router = useRouter();
  const snackbar = useSnackbar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent the browser from reloading the page

    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string,
      password = data.get("password") as string;

    if (!username || !password) {
      snackbar.enqueueSnackbar("Invalid username or password.", {
        variant: "warning",
        preventDuplicate: true,
      });
      return;
    }

    dispatch(
      async (client) => {
        await client.newSession();
        await client.session.authenticateUser(username, password);
        router.push("/");
      },
      router,
      snackbar
    );
  };

  dispatch((_) => {}, router, snackbar, {
    requireToBeNotAuthenticated: true,
  });

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="off"
        autoFocus
        sx={{ mb: 3 }}
      />
      <TextField
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        type="password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Link href="/signup" variant="body2">
        Don’t have an account?
      </Link>
    </form>
  );
}
