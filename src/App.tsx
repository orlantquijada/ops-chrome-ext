import { useState } from 'react'

import { globalStyles } from '../stitches.config'
import { Link } from 'react-router-dom'
import * as Dialog from './components/Dialog'

function App() {
  globalStyles()
  const [count, setCount] = useState(0)

  const handleStartExam = () => {}
  const handleEndExam = () => {}

  return (
    <div style={{ width: 320, height: 550 }}>
      <h1>{count}</h1>
      <div>
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem',
          }}
        >
          <Link to="/invoices">Invoices</Link> |{' '}
          <Link to="/expenses">Expenses</Link>
        </nav>

        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <button onClick={() => setCount((c) => c - 1)}>-</button>
        <button onClick={handleStartExam}>start</button>
        <button onClick={handleEndExam}>end</button>
        <h2>asdasd</h2>
        <Dialog.Root>
          <Dialog.Trigger>Wow</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title css={{ color: '$bloo-light-primary' }}>
              title
            </Dialog.Title>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  )
}

export default App
