import { create } from '../utils/api/activities'
import { Exam } from '../utils/types'
import Box from './Box'
import Button from './Button'
import Flex from './Flex'
import Text from './Text'

export default function ExamCard({ exam }: { exam: Exam }) {
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
          await chrome.storage.sync.set({ startExam: true, examId: exam.id })
          await create({
            isSuspicious: false,
            name: 'JOINED_EXAM',
            description: '',
            examId: 1,
            examineeId: 2,
          })
          window.close()
        }}
      >
        Start Exam
      </Button>
    </Flex>
  )
}
