import React, { useState } from "react";
import { Grid, Typography, Box, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { stringParameter, oStringParameter, dispatch } from "../utils";
import { Profile } from "socialvoid";
import { useSnackbar } from "notistack";

export default function Profile() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [profile, setProfile] = useState<Profile>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName"),
      lastName = data.get("lastName"),
      location = data.get("location"),
      url = data.get("url"),
      bio = data.get("bio");

    if (!firstName) {
      snackbar.enqueueSnackbar("First name can’t be empty.", {
        variant: "warning",
        preventDuplicate: true,
      });
      return;
    }

    dispatch(
      async (client) => {
        await client.account.updateProfileName(
          stringParameter(firstName),
          oStringParameter(lastName)
        );

        if (!location) {
          await client.account.clearProfileLocation();
        } else {
          await client.account.updateProfileLocation(stringParameter(location));
        }

        if (!url) {
          await client.account.clearProfileURL();
        } else {
          await client.account.updateProfileURL(stringParameter(url));
        }

        if (!bio) {
          await client.account.clearProfileBiography();
        } else {
          await client.account.updateProfileBiography(stringParameter(bio));
        }

        snackbar.enqueueSnackbar("Profile updated.", {
          variant: "success",
          preventDuplicate: true,
        });
      },
      router,
      snackbar
    );
  };

  dispatch(
    async (client) => {
      const profile = await client.network.getProfile();
      setProfile(profile);
    },
    router,
    snackbar,
    {
      requireToBeAuthenticated: true,
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
        Edit your profile
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              contentEditable
              label="First name"
              name="firstName"
              id="firstName"
              value={profile?.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last name"
              name="lastName"
              id="lastName"
              value={profile?.last_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              id="location"
              placeholder="City, Country"
              value={profile?.location}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Website"
              name="url"
              id="url"
              value={profile?.url}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={3}
              fullWidth
              label="Bio"
              placeholder="Some words about you..."
              name="bio"
              id="bio"
              value={profile?.biography}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Profile
        </Button>
      </Box>
    </Box>
  );
}
