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

export type ActivityType =
  | 'SWITCHED_TAB'
  | 'LOSE_WINDOW_FOCUS'
  | 'WENT_INCOGNITO'
  | 'ACCESSED_SITE'
  | 'USED_SEARCH_ENGINE'
  | 'FINISHED_EXAM_FAST'
  | 'ENTERED_EXAM_LATE'
  | 'FINISHED_EXAM'
  | 'WENT_IDLE'
  | 'JOINED_EXAM'

export interface Activity {
  id: number
  name: ActivityType
  description: string
  examId: Exam['id']
  examineeId: User['id']
  isSuspicious: boolean
}
