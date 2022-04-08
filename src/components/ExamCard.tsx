import { create } from '../utils/api/activities'
import { Exam } from '../utils/types'
import Button from './Button'
import Flex from './Flex'
import Text from './Text'
import useAuth from '../utils/stores/auth'

export default function ExamCard({ exam }: { exam: Exam }) {
  const user = useAuth((s) => s.user)

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
      <Button
        variant="primary"
        size="sm"
        onClick={async () => {
          const activeTab = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          })
          await chrome.storage.sync.set({
            startExam: true,
            examId: exam.id,
            examineeId: user?.id,
            url: activeTab[0].url,
          })
          await create({
            isSuspicious: false,
            name: 'JOINED_EXAM',
            description: 'has started answering the exam.',
            examId: exam.id,
            examineeId: user?.id as number,
          })
          window.close()
        }}
      >
        Start Exam
      </Button>
    </Flex>
  )
}
