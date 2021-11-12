import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './Routes'
import Theme from './components/Theme'

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <Routes />
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
)
