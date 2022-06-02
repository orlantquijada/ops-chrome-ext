/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Exam,
  GoogleFormURL,
  MoodleFormURL,
  OfficeFormURL,
  Platform,
} from '../utils/types'
import { isEarly } from '../utils/methods'
import { buttonStyles } from './Button'
import Flex from './Flex'
import Text from './Text'
import useAuth from '../utils/stores/auth'
import Box from './Box'
import { formatTime } from '../utils/formatters'
import { useNavigate } from 'react-router'
import dayjs from 'dayjs'

export default function ExamCard({ exam }: { exam: Exam }) {
  const user = useAuth((s) => s.user)
  const navigate = useNavigate()

  const handleStartExam = async () => {
    const url = new URL(exam.link)

    const isLate = !isEarly(exam.startTime, exam.endTime)
    chrome.storage.sync.set({
      settled: false,
      examId: exam.id,
      examineeId: user?.id,
      url: `${url.origin}${url.pathname}`,
      platform: exam.platform,
      formId: getFormId(exam.platform, exam.link),
      isLate,
    })
    chrome.alarms.create('finish-exam', {
      when: +new Date(exam.endTime),
    })
  }

  const isOngoing = exam.status === 'ONGOING'

  const finishCb = useCallback(() => {
    navigate('/exams')
  }, [])

  return (
    <Flex
      justify="between"
      direction="column"
      css={{
        backgroundColor: '$bloo-light-30',
        p: '1rem',
        w: '100%',
        borderRadius: '8px',
      }}
      gap="2"
    >
      {isOngoing ? (
        <Box
          css={{
            backgroundColor: '$bloo-light-10',
            borderRadius: '8px',
            p: '.25rem',
            w: 'fit-content',
          }}
        >
          <Text color="white1" weight="semibold" fontSize="lg">
            {exam.name}
          </Text>
        </Box>
      ) : (
        <Flex direction="row" justify="between" align="center">
          <Text color="bloo-light-primary" weight="bold" fontSize="lg">
            {exam.name}
          </Text>
          <Badge
            label={new Date(exam.startTime).toLocaleString('en-us', {
              weekday: 'long',
            })}
          />
        </Flex>
      )}

      {isOngoing ? (
        <Flex gap="2" justify="between" align="end" direction="row">
          <Flex gap="1" direction="column">
            <Text color="bloo-light-primary" fontSize="sm" weight="semibold">
              Time Left
            </Text>

            <RemainingTime endTime={exam.endTime} finishCb={finishCb} />
          </Flex>
          <a
            href={exam.link}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: 'primary', size: 'sm' })}
            onClick={handleStartExam}
          >
            Start Exam
          </a>
        </Flex>
      ) : (
        <Text color="bloo-light-20" fontSize="sm" weight="semibold">
          {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
        </Text>
      )}
    </Flex>
  )
}

function RemainingTime({
  endTime,
  finishCb,
}: {
  endTime: Date
  finishCb: () => void
}) {
  const [durationLeft, setDurationLeft] = useState(() => {
    return dayjs(endTime).unix() - dayjs().unix()
  })

  const intervalId = useRef<number>()

  useEffect(() => {
    const id = setInterval(() => setDurationLeft((val) => val - 1), 1000)
    intervalId.current = id

    return () => clearInterval(intervalId.current || id)
  }, [])

  useEffect(() => {
    if (durationLeft <= 0) {
      clearInterval(intervalId.current)
      finishCb()
    }
  }, [durationLeft, finishCb])

  const hour = Math.floor(durationLeft / 60 / 60)
  const minute = Math.floor((durationLeft / 60) % 60)
  const seconds = Math.floor(durationLeft % 60)

  if (durationLeft <= 0) return null

  return (
    <Text color="bloo-light-primary" fontSize="sm">
      {hour ? `${hour}h` : null} {minute ? `${minute}m` : null}{' '}
      {seconds ? `${seconds}s` : '00s'}
    </Text>
  )
}

function Badge({ label }: { label: string }) {
  return (
    <Box
      css={{
        h: 'fit-content',
        backgroundColor: '$white1',
        border: '1px solid $bloo-light-10',
        borderRadius: '999px',
        px: '.45rem',
      }}
    >
      <Text color="bloo-light-10" weight="semibold" fontSize="xs">
        {label}
      </Text>
    </Box>
  )
}

const parseGoogleFormURL = (url: GoogleFormURL) => {
  // google form url pattern
  // https://docs.google.com/forms/d/e/{form_id}/viewform?usp=sf_link
  const splitURL = url.split('/')

  return {
    id: splitURL[splitURL.length - 2],
  }
}

const parseTeamsFormURL = (url: OfficeFormURL) => {
  // google form url pattern
  // https://docs.google.com/forms/d/e/{form_id}/viewform?usp=sf_link
  return {
    id: new URL(url).searchParams.get('id'),
  }
}

const parseMoodleFormURL = (url: MoodleFormURL) => {
  // moodle form url pattern
  // https://lair.education/mod/quiz/attempt.php?attempt={attempt_id}&cmid={form_id}
  const params = new URL(url).searchParams
  return {
    id: params.get('cmid') || params.get('id'),
  }
}

const getFormId = (platform: Platform, url: string) => {
  if (platform === 'TEAMS') return parseTeamsFormURL(url as any).id
  if (platform === 'GOOGLE_FORMS') return parseGoogleFormURL(url as any).id
  return parseMoodleFormURL(url as any).id
}

// const isOnCorrectExamURL = async (examPlatform: Platform, examUrl: string) => {
//   const activeTab = await chrome.tabs.query({
//     active: true,
//     currentWindow: true,
//   })

//   if (examPlatform === 'GOOGLE_FORMS') {
//     const { id } = parseGoogleFormURL(examUrl as GoogleFormURL)

//     return (
//       activeTab[0].url?.startsWith('https://docs.google.com/forms/d/e/') &&
//       id === parseGoogleFormURL(activeTab[0].url as GoogleFormURL).id
//     )
//   } else if (examPlatform === 'TEAMS') {
//     return examUrl === activeTab[0].url
//   }

//   // TODO: handle Moodle validation
//   return false
// }
