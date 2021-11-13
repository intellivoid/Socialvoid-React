import { AppProps } from 'next/app'

import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

import { SnackbarProvider } from 'notistack'

import Header from '../components/Header'
import Theme from '../components/Theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <CssBaseline />
      <SnackbarProvider>
        <Header />
        <Container component="main" maxWidth="sm">
          <Component {...pageProps} />
        </Container>
      </SnackbarProvider>
    </Theme>
  )
}
