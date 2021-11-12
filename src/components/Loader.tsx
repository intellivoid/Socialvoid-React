import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import useTheme from '@mui/material/styles/useTheme'

export default function Loader() {
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
