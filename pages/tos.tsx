import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSnackbar } from "notistack";
import { pushWithQuery, dispatch } from "../utils";

export default function TOS() {
  const router = useRouter();
  const snackbar = useSnackbar();

  const [tosId, setTosId] = useState("");
  const [text, setText] = useState("Loading...");
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("acceptTermOfServices") != "on") {
      snackbar.enqueueSnackbar("You must read and accept.", {
        variant: "info",
        preventDuplicate: true,
      });
      return;
    }

    snackbar.closeSnackbar();
    pushWithQuery(router, "/signup", { tosId: data.get("tosId") });
  };

  dispatch(
    async (client) => {
      const { id, text } = await client.help.getTermsOfService();
      setTosId(id);
      setText(text);
      setDisabled(false);
    },
    router,
    snackbar,
    { requireToBeNotAuthenticated: true }
  );

  return (
    <>
      <Typography component="h1" variant="h5" hidden={disabled}>
        Socialvoid - Terms of Service
      </Typography>
      <p>{text}</p>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <input type="hidden" name="tosId" value={tosId} />
        <FormControlLabel
          control={
            <Checkbox
              name="acceptTermOfServices"
              color="primary"
              disabled={disabled}
            />
          }
          label="I have read and accepted the Socialvoid Terms of Services."
        />
        <Button
          type="submit"
          variant="contained"
          disabled={disabled}
          sx={{ mt: 3, mb: 2 }}
          fullWidth
        >
          Next
        </Button>
      </Box>
    </>
  );
}
