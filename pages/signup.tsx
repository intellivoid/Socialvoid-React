import React from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import {
  dispatch,
  stringParameter,
  oStringParameter,
  validatePassword,
} from "../utils";

export default function SignUp() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [tosId, setTosId] = React.useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let tosId = data.get("tosId"),
      username = data.get("username"),
      password = data.get("password"),
      firstName = data.get("firstName"),
      lastName = data.get("lastName");

    dispatch(
      async (client) => {
        if (!tosId || !username || !password || !firstName) {
          snackbar.enqueueSnackbar("Got invalid inputs.", {
            variant: "warning",
            preventDuplicate: true,
          });
          return;
        }

        const passwordValid = validatePassword(stringParameter(password));

        if (passwordValid != true) {
          snackbar.enqueueSnackbar("The password " + passwordValid + ".", {
            variant: "info",
            preventDuplicate: true,
          });
          return;
        }

        await client.newSession();

        await client.session.register(
          stringParameter(tosId),
          stringParameter(username),
          stringParameter(password),
          stringParameter(firstName),
          oStringParameter(lastName)
        );

        await client.session.authenticateUser(
          username as string,
          password as string
        );

        snackbar.enqueueSnackbar("Signed up successfully.", {
          variant: "success",
        });
        router.push("/");
      },
      router,
      snackbar
    );
  };

  dispatch(
    (_) => {
      const tosId = router.query.tosId;

      if (typeof tosId === "undefined") {
        router.push("/tos");
        return;
      }

      setTosId(String(tosId));
    },
    router,
    snackbar,
    {
      requireToBeNotAuthenticated: true,
      stopLoading: true,
    }
  );

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
        <input type="hidden" id="tosId" name="tosId" value={tosId} />
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
              autoComplete="off"
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
