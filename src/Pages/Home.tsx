import { useState } from "react"
import { useNavigate } from "react-router"
import { Box, Avatar, TextField } from "@mui/material"
import { useSnackbar } from "notistack"
import { Profile } from "socialvoid"
import { dispatch } from "../socialvoid"

export default function Home() {
    const navigate = useNavigate()
    const snackbar = useSnackbar()

    const [profile, setProfile] = useState<Profile & { photo: string }>()

    dispatch(
        async (client) => {
            const profile = await client.network.getProfile()

            const photo = await client.cdn.download(
                profile.display_picture_sizes[0].document,
                true
            )

            setProfile({ ...profile, photo: URL.createObjectURL(photo) })
        },
        { navigate, snackbar }
    )

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
            <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="username"
                autoComplete="off"
                autoFocus
                sx={{ mb: 3 }}
            />
        </Box>
    )
}
