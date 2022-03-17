import useExams from '../utils/hooks/useExams'
import Layout from '../components/Layout'
import useAuth from '../utils/stores/auth'

export default function ExamsScreen() {
  const user = useAuth((state) => state.user)

  const { data: exams, isLoading } = useExams({
    params: { examineeId: user?.id },
    options: { enabled: Boolean(user?.id) },
  })

  return (
    <Layout>
      <p>{isLoading ? 'loading' : exams?.length}</p>
    </Layout>
  )
}
