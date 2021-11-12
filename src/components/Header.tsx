import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useScrollTrigger from '@mui/material/useScrollTrigger'

export default function Header() {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <Paper
        component="header"
        variant="outlined"
        sx={{
          borderTop: 'none',
          borderRight: 'none',
          borderLeft: 'none',
          userSelect: 'none',
        }}
      >
        <Container maxWidth="sm">
          <AppBar position="sticky" color="transparent">
            <Toolbar>
              <Typography variant="h6" component="div">
                Socialvoid
              </Typography>
            </Toolbar>
          </AppBar>
        </Container>
      </Paper>
    </Slide>
  )
}
