import * as React from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { errors } from "socialvoid";
import { client } from "../client";
import { runOnClient, returnIfAuthenticated } from "../utils";

export default function Authenticate() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  runOnClient(async () => {
    if (await returnIfAuthenticated(router)) {
      return;
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent the browser from reloading the page

    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string,
      password = data.get("password") as string;

    if (!username || !password) {
      enqueueSnackbar("Invalid username or password.", {
        preventDuplicate: true,
      });
      return;
    }

    try {
      await client.newSession();
      await client.session.authenticateUser(username, password);
    } catch (err) {
      if (err instanceof errors.TwoFactorAuthenticationRequired) {
        enqueueSnackbar("OTP is unsupported.");
      } else {
        enqueueSnackbar("An unexpected error occurred.");
      }

      return;
    }

    router.push("/");
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Socialvoid - Sign In
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signup" variant="body2">
              Don’t have an account?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
