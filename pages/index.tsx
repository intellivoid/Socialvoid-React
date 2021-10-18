import { useState } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { authenticated, client } from "../client";
import { runOnClient } from "../utils";

export default function Index() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("");

  runOnClient(async () => {
    if (!(await authenticated())) {
      router.push("/signin");
      return;
    }

    const me = await client.network.getMe();
    setGreeting(`Hello ${me.name}!`);
  });

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
      <Link href="/logout">Logout</Link>
    </Box>
  );
}
