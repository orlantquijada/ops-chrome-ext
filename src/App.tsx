import { useState } from 'react'

import { globalStyles } from '../stitches.config'
import { Link } from 'react-router-dom'
import * as Dialog from './components/Dialog'
import LoginScreen from './routes/LoginScreen'

function App() {
  globalStyles()
  const [count, setCount] = useState(0)

  const handleStartExam = () => {}
  const handleEndExam = () => {}

  return <LoginScreen />
}

export default App
