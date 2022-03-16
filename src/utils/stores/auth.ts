import create from 'zustand'
import { User } from '../types'
import * as usersService from '../api/users'

interface State {
  user: User | null
  signin: typeof usersService.login
  signout: VoidFunction
}

// And it is going to work for both
const useAuth = create<State>((set) => ({
  user: null,
  signout: () => set({ user: null }),
  signin: (values) =>
    usersService.login(values).then((user) => {
      set({ user })
      return user
    }),
}))

export default useAuth
