import * as React from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { client } from "../client";
import { runOnClient, returnIfAuthenticated } from "../utils";

export default function SignUp() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  let tosId = "0";

  runOnClient(async () => {
    if (await returnIfAuthenticated(router)) {
      return;
    }

    const gotTosId = router.query.tosId;

    if (typeof gotTosId === "undefined") {
      router.push("/tos");
      return;
    }

    tosId = String(gotTosId);
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let username = data.get("username"),
      password = data.get("password"),
      firstName = data.get("firstName"),
      lastName = data.get("lastName");

    (lastName != lastName) == null ? undefined : lastName;

    if (!username || !password || !firstName) {
      enqueueSnackbar("Got invalid inputs.", { preventDuplicate: true });
      return;
    }

    await client.newSession();
    await client.session.register(
      tosId,
      username as string,
      password as string,
      firstName as string,
      lastName as string | undefined
    );
    await client.session.authenticateUser(
      username as string,
      password as string
    );

    enqueueSnackbar("Signed up successfully.");
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
        Socialvoid - Sign Up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="First name"
              name="firstName"
              autoComplete="off"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="off"
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
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signin" variant="body2">
              Already have an account?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
