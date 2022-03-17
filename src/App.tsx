import { QueryClient, QueryClientProvider } from 'react-query'

import { globalStyles } from '../stitches.config'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './routes/LoginScreen'
import { RequireAuth } from './components/RequireAuth'
import Expenses from './routes/expenses'
import Invoices from './routes/invoices'
import useAuth from './utils/stores/auth'

const queryClient = new QueryClient()

function App() {
  globalStyles()

  const hasHydrated = useAuth((s) => s._hasHydrated)

  if (!hasHydrated) return <p>Loading...</p>

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="expenses"
          element={
            <RequireAuth>
              <Expenses />
            </RequireAuth>
          }
        />
        <Route path="invoices" element={<Invoices />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
