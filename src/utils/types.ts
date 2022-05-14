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

export interface UserWithActivity extends User {
  Activity: Activity[]
}

export type GoogleFormURL =
  `https://docs.google.com/forms/d/e/${string}/viewform?usp=sf_link`

export type OfficeFormURL =
  `https://forms.office.com/Pages/ResponsePage.aspx?id=${string}`

export type MoodleFormURL = `https://${string}`

export type Exam = {
  id: number
  classId: number
  name: string
  description?: string
  status: ExamStatus
  startTime: Date
  endTime: Date
  createdAt: Date
} & (
  | {
      platform: 'GOOGLE_FORMS'
      link: GoogleFormURL
    }
  | {
      platform: 'TEAMS'
      link: OfficeFormURL
    }
  | {
      platform: 'MOODLE'
      link: MoodleFormURL
    }
)

export type ExamStatus = 'UPCOMING' | 'ONGOING' | 'FINISHED'

export type ActivityType =
  | 'SWITCHED_TAB'
  | 'LOSE_WINDOW_FOCUS'
  | 'ACCESSED_SITE'
  | 'USED_SEARCH_ENGINE'
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
  Examinee: User
  createdAt: Date
}
