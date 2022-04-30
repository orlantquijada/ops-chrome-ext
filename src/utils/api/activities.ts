import { Exam, User, ActivityType } from '../types'
import axios from './axios'

export interface CreateRequestBody {
  name: ActivityType
  description: string
  examId: Exam['id']
  examineeId: User['id']
  isSuspicious: boolean
}

export const create = (values: CreateRequestBody) =>
  axios.post('activities', values)
