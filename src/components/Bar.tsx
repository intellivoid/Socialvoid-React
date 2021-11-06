import { AppBar, Toolbar, Typography, AppBarProps } from "@mui/material"
import HideOnScroll from "./HideOnScroll"

export default function Bar(props: AppBarProps) {
  return (
    <HideOnScroll>
      <AppBar {...props} sx={{ userSelect: "none" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="div">
            Socialvoid
          </Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}
