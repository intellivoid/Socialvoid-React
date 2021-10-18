import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useSnackbar } from "notistack";
import { dispatch } from "../utils";

export default function Index() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [greeting, setGreeting] = useState("");
  const [src, setSrc] = useState("");

  dispatch(
    async (client) => {
      const me = await client.network.getMe();
      setGreeting(`Hello ${me.name}!`);

      const profile = await client.network.getProfile();

      const document = profile.display_picture_sizes[0].document;

      const blob = (await client.cdn.download(document, true)) as Blob;

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
      <Typography variant="h1">{greeting}</Typography>
      <Image src={src} alt="Profile picture" />
      <Link href="/logout">Logout</Link>
    </Box>
  );
}
