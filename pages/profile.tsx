import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Link,
  Avatar,
  TextField,
} from "@mui/material";
import { ChangeCircle, RemoveCircle } from "@mui/icons-material";

export default function Index() {
  // avatar
  const [avatar, setAvatar] = useState<string>();
  const [avatarEl, setAvatarEl] = useState<Element>();

  const openAvatarMenu = (event: React.MouseEvent) => {
    setAvatarEl(event.currentTarget);
  };

  const closeAvatarMenu = () => {
    setAvatarEl(undefined);
  };

  const removeAvatar = () => {
    setAvatar(undefined);
    closeAvatarMenu();
  };

  const changeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (files && files[0]) {
      setAvatar(URL.createObjectURL(files[0]));
    }

    closeAvatarMenu();
  };
  // end avatar

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
        src={avatar}
        alt="Your profile photo"
        sx={{ width: 100, height: 100, mb: 3 }}
        onClick={openAvatarMenu}
      />
      <Menu
        id="basic-menu"
        anchorEl={avatarEl}
        open={Boolean(avatarEl)}
        onClose={closeAvatarMenu}
      >
        <MenuItem component="label">
          <ListItemIcon>
            <ChangeCircle />
          </ListItemIcon>
          <ListItemText>Change</ListItemText>
          <input
            id="avatarInput"
            accept="image/*"
            type="file"
            onChange={changeAvatar}
            hidden
          />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <RemoveCircle />
          </ListItemIcon>
          <ListItemText onClick={removeAvatar}>Remove</ListItemText>
        </MenuItem>
      </Menu>
      <TextField type="text" />
      <Link href="/logout">Logout</Link>
    </Box>
  );
}
