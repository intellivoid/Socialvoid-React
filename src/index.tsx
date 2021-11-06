import React from "react"
import ReactDOM from "react-dom"
import UI from "./UI"
import Pages from "./Pages"

ReactDOM.render(
  <React.StrictMode>
    <UI>
      <Pages />
    </UI>
  </React.StrictMode>,
  document.getElementById("root")
)
