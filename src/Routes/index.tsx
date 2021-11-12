import { BrowserRouter as B, Route as R, Routes as S } from 'react-router-dom'

import Container from '@mui/material/Container'

import Header from '../components/Header'
import Home from './Home'
import Post from './Post'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ToS from './ToS'

export default function Routes() {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="sm">
        <B>
          <S>
            <R path="/" element={<Home />} />
            <R path="/signin" element={<SignIn />} />
            <R path="/signup" element={<SignUp />} />
            <R path="/tos" element={<ToS />} />
            <R path="/post" element={<Post />} />
          </S>
        </B>
      </Container>
    </>
  )
}
