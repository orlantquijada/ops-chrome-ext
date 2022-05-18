// import { create } from '../utils/api/activities'
import { Exam } from '../utils/types'
import { isEarly } from '../utils/methods'
import { buttonStyles } from './Button'
import Flex from './Flex'
import Text from './Text'
import useAuth from '../utils/stores/auth'

export default function ExamCard({ exam }: { exam: Exam }) {
  const user = useAuth((s) => s.user)

  const handleStartExam = async () => {
    const url = new URL(exam.link)

    const isLate = !isEarly(exam.startTime, exam.endTime)
    chrome.storage.sync.set({
      settled: false,
      examId: exam.id,
      examineeId: user?.id,
      url: `${url.origin}${url.pathname}`,
      isLate,
    })
    chrome.alarms.create('finish-exam', {
      when: +new Date(exam.endTime),
    })
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
    </Flex>
  )
}

// const parseGoogleFormURL = (url: GoogleFormURL) => {
//   // google form url pattern
//   // https://docs.google.com/forms/d/e/{form_id}/viewform?usp=sf_link
//   const splitURL = url.split('/')

//   return {
//     id: splitURL[splitURL.length - 2],
//   }
// }

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
