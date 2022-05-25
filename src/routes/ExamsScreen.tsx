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
    params: { examineeId: user?.id },
    options: { enabled: Boolean(user?.id) },
  })

  if (isLoading) return <div>loading...</div>

  const ongoingExams = exams?.filter((exam) => exam.status === 'ONGOING')
  const upcomingExams = exams?.filter((exam) => exam.status === 'UPCOMING')

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
        <Text
          as="h1"
          color="bloo-light-primary"
          fontSize="2xl"
          css={{ mb: '1rem' }}
        >
          Exams
        </Text>
        <Flex direction="column" gap="2" css={{ py: '$4' }}>
          <SectionHeader>Ongoing</SectionHeader>
          {ongoingExams?.length ? (
            ongoingExams.map((exam) => <ExamCard exam={exam} key={exam.id} />)
          ) : (
            <Text color="bloo-light-primary">No ongoing exams right now.</Text>
          )}
          <SectionHeader>Upcoming</SectionHeader>
          {upcomingExams?.length ? (
            upcomingExams.map((exam) => <ExamCard exam={exam} key={exam.id} />)
          ) : (
            <Text color="bloo-light-primary"> No exams upcoming.</Text>
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

const SectionHeader = styled('div', {
  color: '$bloo-light-20',
  fontSize: 'large',
  fontWeight: '$bold',
})
