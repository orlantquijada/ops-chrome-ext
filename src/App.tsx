import { QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react'

import { globalStyles } from '../stitches.config'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './routes/LoginScreen'
import { RequireAuth } from './components/RequireAuth'
import ClassesScreen from './routes/ClassesScreen'
import ExamsScreen from './routes/ExamsScreen'
import useAuth from './utils/stores/auth'
import EnableIncognitoScreen from './routes/EnableIncognitoScreen'

const queryClient = new QueryClient()

function App() {
  globalStyles()

  const [loading, setLoading] = useState(true)
  const [allowedInIncognito, setAllowedInIncognito] = useState(false)

  const hasHydrated = useAuth((s) => s._hasHydrated)

  useEffect(() => {
    // @ts-expect-error asdasd
    chrome.extension.isAllowedIncognitoAccess().then((isAllowed) => {
      setAllowedInIncognito(isAllowed)
      setLoading(false)
    })
  }, [])

  if (!hasHydrated || loading) return <p>Loading...</p>
  else if (!allowedInIncognito) return <EnableIncognitoScreen />

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
