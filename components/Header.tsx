import { AppBar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="sticky" color="transparent">
      <Typography component="h1" variant="h4">
        Socialvoid
      </Typography>
    </AppBar>
  );
}
