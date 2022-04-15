import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import { create } from '../utils/api/activities'
import { useExam } from '../utils/hooks/useExams'
import useAuth from '../utils/stores/auth'

export default function ExamsDetailScreen() {
  const user = useAuth((s) => s.user)
  const params = useParams<{ examId: string }>()
  const examId = params.examId ? parseInt(params.examId, 10) : 0

  const { data: exam, status } = useExam(examId, { enabled: Boolean(examId) })

  if (status !== 'success' || !user) return <div>loading</div>

  return (
    <div>
      <h1>{exam.name}</h1>
      <Button
        variant="primary"
        size="sm"
        onClick={() => {
          create({
            name: 'FINISHED_EXAM',
            description: '',
            examId,
            examineeId: user.id,
            isSuspicious: false,
          })

          chrome.storage.sync.clear()
        }}
      >
        Finish Exam
      </Button>
    </div>
  )
}
