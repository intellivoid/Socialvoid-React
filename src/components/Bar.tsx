import { AppBar, AppBarProps, Toolbar, Typography } from "@mui/material"
import HideOnScroll from "./HideOnScroll"

export default function Bar(props: AppBarProps & { routeTitle?: string }) {
  return (
    <HideOnScroll>
      <AppBar {...props} sx={{ userSelect: "none" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="div">
            Socialvoid
          </Typography>
          {props.routeTitle ? (
            <Typography variant="h6" component="div">
              {props.routeTitle}
            </Typography>
          ) : undefined}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}
