import React, { useState } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { ChangeCircle } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useSnackbar } from "notistack";
import { Profile } from "socialvoid";
import { dispatch } from "../utils";

export default function Index() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const [profile, setProfile] = useState<Profile>();
  const [src, setSrc] = useState("");

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  dispatch(
    async (client) => {
      const profile = await client.network.getProfile();

      setProfile(profile);

      const document = profile.display_picture_sizes[1].document;

      const blob = await client.cdn.download(document, true);

      setSrc(URL.createObjectURL(blob));
    },
    router,
    snackbar,
    { requireToBeAuthenticated: true }
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
        alt="Your profile photo"
        src={src}
        sx={{ width: 100, height: 100, mb: 3 }}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ChangeCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <Typography component="h1" variant="h5">
        {profile?.name}
      </Typography>
      <Link href="/logout">Logout</Link>
    </Box>
  );
}
