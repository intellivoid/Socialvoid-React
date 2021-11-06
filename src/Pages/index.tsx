import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import ToS from "./ToS"

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tos" element={<ToS />} />
      </Routes>
    </BrowserRouter>
  )
}
