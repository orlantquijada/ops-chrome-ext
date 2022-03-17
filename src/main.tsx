import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import LoginScreen from './routes/LoginScreen'

ReactDOM.render(
  <React.StrictMode>
    {/* <MemoryRouter> */}
    {/* <App /> */}
    <LoginScreen />
    {/* </MemoryRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
)
