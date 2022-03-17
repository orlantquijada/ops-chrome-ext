import create from 'zustand'
import { persist, StateStorage } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval'

import { User } from '../types'
import * as usersService from '../api/users'

const STORAGE_NAME = 'auth-storage'

// storage syncing to give 'background.js' access to user data
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    chrome.storage.sync.get(name)
    return (await get(name)) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    chrome.storage.sync.set({ [name]: JSON.parse(value) })
    await set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    chrome.storage.local.remove(name)
    await del(name)
  },
}

interface State {
  user: User | null
  signin: typeof usersService.login
  signout: (callback?: VoidFunction) => void

  _hasHydrated: boolean
  setHasHydrated: (_hasHydrated: boolean) => void
}

// And it is going to work for both
const useAuth = create<State>(
  persist(
    (set, _get) => ({
      user: null,
      signout: (cb) => {
        set({ user: null })
        if (cb) cb()
      },
      signin: (values) =>
        usersService.login(values).then((user) => {
          set({ user })
          return user
        }),

      _hasHydrated: false,
      setHasHydrated: (_hasHydrated) => set({ _hasHydrated }),
    }),
    {
      name: STORAGE_NAME,
      getStorage: () => storage,
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
)

export default useAuth
