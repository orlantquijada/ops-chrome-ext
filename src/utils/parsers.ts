import produce from 'immer'
import dayjs from 'dayjs'

import { Class, Exam, User } from './types'

export function parseNativeTimeInput(v: string) {
  // native input[type="time"] returns '23:59'
  const [hours, minutes] = v.split(':').map((t) => parseInt(t, 10))

  return { hours, minutes }
}

export const parseClass = produce<Class>((draft) => {
  draft.createdAt = dayjs(draft.createdAt).toDate()
})

export const parseUser = produce<User>((draft) => {
  draft.createdAt = dayjs(draft.createdAt).toDate()
})

export const parseExam = produce<Exam>((draft) => {
  draft.createdAt = dayjs(draft.createdAt).toDate()
  draft.startTime = dayjs(draft.startTime).toDate()
  draft.endTime = dayjs(draft.endTime).toDate()
})
