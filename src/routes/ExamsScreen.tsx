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
        {/* <button onClick={() => chrome.storage.sync.set({ n: Math.random() })}>
          set
        </button>
        <button
          onClick={async () => {
            console.log(await chrome.storage.sync.get())
          }}
        >
          get
        </button>
        */}
        {/* <button onClick={() => chrome.storage.sync.clear()}>clear</button> */}
        <Text as="h1" color="bloo-light-primary" fontSize="2xl">
          Exams
        </Text>
        <Flex direction="column" css={{ mt: '$4' }}>
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
