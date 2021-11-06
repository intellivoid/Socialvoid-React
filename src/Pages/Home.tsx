import { useState } from "react";
import { Box, Link, Avatar, TextField, Typography } from "@mui/material";
import { dispatch } from "../socialvoid";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { Profile } from "socialvoid";

export default function Home() {
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const [profile, setProfile] = useState<Profile & { photo: string }>();

  dispatch(
    async (client) => {
      const profile = await client.network.getProfile();
      const photo = await client.cdn.download(
        profile.display_picture_sizes[0].document,
        true
      );

      setProfile({ ...profile, photo: URL.createObjectURL(photo) });
    },
    { navigate, snackbar }
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
      <Avatar
        src={profile?.photo}
        alt="Your profile photo"
        sx={{ width: 100, height: 100, mb: 3 }}
      />
      <Typography component="h5" variant="h5">
        {profile?.name}
      </Typography>
      <Typography variant="body1">
        {profile?.biography || <code>No bio.</code>}
      </Typography>
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
    </Box>
  );
}
