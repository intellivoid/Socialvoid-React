import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'

export default function Router() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        mt: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress sx={{ color: theme.palette.text.primary }} />
    </Box>
  )
}
