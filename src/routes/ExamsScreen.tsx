import useExams from '../utils/hooks/useExams'
import Layout from '../components/Layout'
import useAuth from '../utils/stores/auth'
import { styled } from '../../stitches.config'
import Logo from '../components/Logo'
import Flex from '../components/Flex'
import { Link } from 'react-router-dom'
import Text from '../components/Text'
import ExamCard from '../components/ExamCard'

export default function ExamsScreen() {
  const user = useAuth((state) => state.user)

  const { data: exams, isLoading } = useExams({
    params: { examineeId: user?.id, status: 'ONGOING' },
    options: { enabled: Boolean(user?.id) },
  })

  if (isLoading) return <div>loading...</div>

  return (
    <Layout css={{ py: '1.5rem', px: '1.5rem' }}>
      <Header>
        <Logo />
        <Flex gap="2">
          <Link to="/classes">
            <Text color="bloo-light-primary">Classes</Text>
          </Link>
          <Link to="/exams">
            <Text color="bloo-light-primary">Exams</Text>
          </Link>
        </Flex>
      </Header>

      <Main>
        <Text as="h1" color="bloo-light-primary" fontSize="2xl">
          Exams
        </Text>
        <Flex direction="column" gap="2" css={{ py: '$4' }}>
          {exams?.length ? (
            exams.map((exam) => <ExamCard exam={exam} key={exam.id} />)
          ) : (
            <Text color="bloo-light-primary">
              No ongoing and upcoming exams right now
            </Text>
          )}
        </Flex>
      </Main>
    </Layout>
  )
}

const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  w: '100%',
})

const Main = styled('main', {
  mt: '$5',
})
