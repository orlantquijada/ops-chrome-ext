export type UserType = 'EXAMINEE' | 'PROCTOR'
export type Platform = 'TEAMS' | 'GOOGLE_FORMS' | 'MOODLE'

export interface Class {
  id: number
  name: string
  section: string
  courseCode: string
  createdAt: Date
  code: string
  proctorId: number
}

export interface Notification {
  title: string
  datetimeCreated: Date
}

export interface User {
  id: number
  email: string
  name: string
  password: string
  role: UserType
  createdAt: Date
}

export interface Exam {
  id: number
  classId: number
  link: string
  name: string
  description?: string
  platform: Platform
  startTime: Date
  endTime: Date
  createdAt: Date
}
