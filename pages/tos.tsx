import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSnackbar } from "notistack";
import { pushWithQuery, dispatch, unparse } from "../utils";
import { HelpDocument } from "socialvoid";

export default function TOS() {
  const router = useRouter();
  const snackbar = useSnackbar();

  const [document, setDocument] = useState<HelpDocument>({
    id: "",
    text: "Loading...",
    entities: [],
  });
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
      const document = await client.help.getTermsOfService();
      setDocument(document);
      setDisabled(false);
    },
    router,
    snackbar,
    { requireToBeNotAuthenticated: true }
  );

  return (
    <>
      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{
          __html: unparse(document.text, document.entities),
        }}
      ></Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <input type="hidden" name="tosId" value={document.id} />
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
