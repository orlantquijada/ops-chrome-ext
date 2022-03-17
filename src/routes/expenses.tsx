import axios from 'axios'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { list } from '../utils/api/users'
import useAuth from '../utils/stores/auth'

export default function Expenses() {
  const s = useAuth((s) => s.signout)
  const user = useAuth((s) => s.user)
  const navigate = useNavigate()

  console.log('rey aaa')
  console.log(user)

  const logout = () => s(() => navigate('/'))

  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Expenses</h2>
      <button onClick={logout}>logout</button>
      <button
        onClick={async () => {
          console.log(await chrome.storage.local.get())
        }}
      >
        asd
      </button>
      <button onClick={() => chrome.storage.local.set({ user: { id: 1 } })}>
        set
      </button>
      <button onClick={() => chrome.storage.local.clear()}>clear</button>
    </main>
  )
}
