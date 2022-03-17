import { parseExam } from '../parsers'
import { User, Exam, Platform, Class } from '../types'
import axios from './axios'

export interface ListQueryParams {
  proctorId?: User['id']
  examineeId?: User['id']
  classId?: Class['id']
}

export const list = (params: ListQueryParams = {}) =>
  axios
    .get<Exam[]>('exams', { params })
    .then((res) => res.data)
    .then((data) => data.map(parseExam))

export interface CreateRequestBody {
  startTime: string
  endTime: string
  classId: Class['id']
  link: string
  platform: Platform
  name: string
  description?: string
}

export const create = (values: CreateRequestBody) => axios.post('exams', values)

export const retrieve = (id: Exam['id']) =>
  axios
    .get<Exam>(`exams/${id}`)
    .then((res) => res.data)
    .then(parseExam)
