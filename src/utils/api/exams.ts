import { parseExam } from '../parsers'
import { User, Exam, Class, ExamStatus } from '../types'
import axios from './axios'

export interface ListQueryParams {
  proctorId?: User['id']
  examineeId?: User['id']
  classId?: Class['id']
  status?: ExamStatus
}

export const list = (params: ListQueryParams = {}) =>
  axios
    .get<Exam[]>('exams', { params })
    .then((res) => res.data)
    .then((data) => data.map(parseExam))

export const retrieve = (id: Exam['id']) =>
  axios
    .get<Exam>(`exams/${id}`)
    .then((res) => res.data)
    .then(parseExam)
