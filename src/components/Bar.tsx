import AppBar from "@mui/material/AppBar"
import Slide from "@mui/material/Slide"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import useScrollTrigger from "@mui/material/useScrollTrigger"

export default function Bar() {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="sticky" variant="outlined">
        <Toolbar>
          <Typography variant="h6" component="div">
            Socialvoid
          </Typography>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}
