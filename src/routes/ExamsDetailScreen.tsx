import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import { create } from '../utils/api/activities'
import { useExam } from '../utils/hooks/useExams'
import { isEarly } from '../utils/methods'
import useAuth from '../utils/stores/auth'

export default function ExamsDetailScreen() {
  const user = useAuth((s) => s.user)
  const params = useParams<{ examId: string }>()
  const examId = params.examId ? parseInt(params.examId, 10) : 0

  const { data: exam, status } = useExam(examId, { enabled: Boolean(examId) })

  if (status !== 'success' || !user) return <div>loading</div>

  const hasFinishedEarly = isEarly(exam.startTime, exam.endTime)
  return (
    <div>
      <h1>{exam.name}</h1>
      <Button
        variant="primary"
        size="sm"
        onClick={() => {
          create({
            name: 'FINISHED_EXAM',
            description: hasFinishedEarly
              ? 'quickly finished the exam.'
              : 'has finished the exam',
            examId,
            examineeId: user.id,
            isSuspicious: hasFinishedEarly,
          })

          chrome.storage.sync.clear()
        }}
      >
        Finish Exam
      </Button>
    </div>
  )
}
