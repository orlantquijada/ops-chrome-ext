import create from 'zustand'
import { persist, StateStorage } from 'zustand/middleware'

import { User } from '../types'
import * as usersService from '../api/users'

const customStorage: StateStorage = {
  getItem: (name: string) =>
    chrome.storage.local.get(name).then((obj) => JSON.stringify(obj[name])),
  setItem: async (name: string, value: string) => {
    console.log(name, value)
    return chrome.storage.local.set({ [name]: value })
  },
  removeItem: async (name: string) => {
    console.log(name, 'has been deleted')
    await chrome.storage.local.remove(name)
  },
}

interface State {
  user: User | null
  signin: typeof usersService.login
  signout: VoidFunction

  _hasHydrated: boolean
  setHasHydrated: (_hasHydrated: boolean) => void
}

// And it is going to work for both
const useAuth = create<State>(
  persist(
    (set, _get) => ({
      user: null,
      signout: () => set({ user: null }),
      signin: (values) =>
        usersService.login(values).then((user) => {
          set({ user })
          return user
        }),

      _hasHydrated: false,
      setHasHydrated: (_hasHydrated) => set({ _hasHydrated }),
    }),
    {
      name: 'auth-storage',
      getStorage: () => customStorage,
      onRehydrateStorage: (state) => {
        state.setHasHydrated(true)
      },
    }
  )
)

export default useAuth
