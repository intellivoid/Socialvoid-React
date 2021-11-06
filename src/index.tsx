import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import UI from "./UI"
import Routes from "./Routes"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UI>
        <Routes />
      </UI>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
