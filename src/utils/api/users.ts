import { parseUser } from '../parsers'
import { User, Class } from '../types'
import axios from './axios'

export interface ListQueryParams {
  classId?: Class['id']
}

export const list = (params: ListQueryParams = {}) =>
  axios
    .get<User[]>('users', { params })
    .then((res) => res.data)
    .then((data) => data.map(parseUser))

export interface LoginRequestBody {
  email: string
  password: string
}

export const login = (values: LoginRequestBody) =>
  axios.post<User>('users/login', values).then((res) => res.data)
