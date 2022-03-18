import { parseClass } from '../parsers'
import { User, Class, Exam } from '../types'
import axios from './axios'

export interface ListQueryParams {
  proctorId?: User['id']
  examineeId?: User['id']
}

export const list = (params: ListQueryParams = {}) =>
  axios
    .get<Class[]>('classes', { params })
    .then((res) => res.data)
    .then((data) => data.map(parseClass))

export const retrieve = (id: Exam['id']) =>
  axios
    .get<Class>(`classes/${id}`)
    .then((res) => res.data)
    .then(parseClass)

export interface EnrolRequestBody {
  code: string
  examineeId: User['id']
}

export const enrol = (values: EnrolRequestBody) =>
  axios.post('classes/enrol', values)
