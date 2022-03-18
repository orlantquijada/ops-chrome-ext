import { QueryClient, QueryClientProvider } from 'react-query'

import { globalStyles } from '../stitches.config'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './routes/LoginScreen'
import { RequireAuth } from './components/RequireAuth'
import ClassesScreen from './routes/ClassesScreen'
import ExamsScreen from './routes/ExamsScreen'
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
          path="classes"
          element={
            <RequireAuth>
              <ClassesScreen />
            </RequireAuth>
          }
        />
        <Route
          path="exams"
          element={
            <RequireAuth>
              <ExamsScreen />
            </RequireAuth>
          }
        />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
