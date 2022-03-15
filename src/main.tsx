import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Expenses from './routes/expenses'
import Invoices from './routes/invoices'

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
      </Routes>
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
