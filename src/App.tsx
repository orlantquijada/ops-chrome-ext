import { useState } from 'react'

import { globalStyles } from '../stitches.config'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import * as Dialog from './components/Dialog'
import LoginScreen from './routes/LoginScreen'
import { RequireAuth } from './components/RequireAuth'
import Expenses from './routes/expenses'
import Invoices from './routes/invoices'
import useAuth from './utils/stores/auth'

function App() {
  globalStyles()

  const hasHydrated = useAuth((s) => s._hasHydrated)

  // if (!hasHydrated) return <p>Loading...</p>

  return <p>{hasHydrated}</p>

  // return (
  //   <Routes>
  //     <Route path="/" element={<LoginScreen />} />
  //     <Route
  //       path="expenses"
  //       element={
  //         <RequireAuth>
  //           <Expenses />
  //         </RequireAuth>
  //       }
  //     />
  //     <Route path="invoices" element={<Invoices />} />
  //   </Routes>
  // )
}

export default App
