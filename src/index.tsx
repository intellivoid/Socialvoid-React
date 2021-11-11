import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import Routes from "./Routes"
import UI from "./UI"

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
