import { create } from '../utils/api/activities'
import { Exam, GoogleFormURL, Platform } from '../utils/types'
import { isEarly } from '../utils/methods'
import Button, { buttonStyles } from './Button'
import Flex from './Flex'
import Text from './Text'
import useAuth from '../utils/stores/auth'

export default function ExamCard({ exam }: { exam: Exam }) {
  const user = useAuth((s) => s.user)

  const handleStartExam = async () => {
    const activeTab = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })

    if (!(await isOnCorrectExamURL(exam.platform, exam.link))) {
      alert('You must be on the correct exam tab to stsart the exam!')
      return
    }

    const isLate = !isEarly(exam.startTime, exam.endTime)
    await chrome.storage.sync.set({
      startExam: true,
      examId: exam.id,
      examineeId: user?.id,
      url: activeTab[0].url,
    })
    await create({
      isSuspicious: isLate,
      name: 'JOINED_EXAM',
      description: isLate
        ? 'is late in starting the exam.'
        : 'has started answering the exam.',
      examId: exam.id,
      examineeId: user?.id as number,
    })
    chrome.alarms.create('finish-exam', {
      when: +new Date(exam.endTime),
    })
    window.close()
  }

  return (
    <Flex
      justify="between"
      css={{
        backgroundColor: '$bloo-light-30',
        p: '1rem',
        w: '100%',
        borderRadius: '5px',
      }}
    >
      <Text color="bloo-light-primary" weight="semibold" fontSize="lg">
        {exam.name}
      </Text>
      <Flex gap="2" align="center">
        <Button variant="primary" size="sm" onClick={handleStartExam}>
          Start Exam
        </Button>

        <a
          href={exam.link}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: 'primary', css: { p: '0.5rem' } })}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </Flex>
    </Flex>
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

const isOnCorrectExamURL = async (examPlatform: Platform, examUrl: string) => {
  const activeTab = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  })

  if (examPlatform === 'GOOGLE_FORMS') {
    const { id } = parseGoogleFormURL(examUrl as GoogleFormURL)

    return (
      activeTab[0].url?.startsWith('https://docs.google.com/forms/d/e/') &&
      id === parseGoogleFormURL(activeTab[0].url as GoogleFormURL).id
    )
  } else if (examPlatform === 'TEAMS') {
    return examUrl === activeTab[0].url
  }

  // TODO: handle Moodle validation
  return false
}
