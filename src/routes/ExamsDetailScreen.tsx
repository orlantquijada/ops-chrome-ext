import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Layout from '../components/Layout'
import Flex from '../components/Flex'
import Text from '../components/Text'
import { create } from '../utils/api/activities'
import { formatFromNow, formatSchedule } from '../utils/formatters'
import { useExam } from '../utils/hooks/useExams'
import { isEarly } from '../utils/methods'
import useAuth from '../utils/stores/auth'
import { styled } from '../../stitches.config'
import dayjs from 'dayjs'
import Logo from '../components/Logo'
import { Platform } from '../utils/types'
import { useClass } from '../utils/hooks/useClasses'
import * as Dialog from '../components/Dialog'

export default function ExamsDetailScreen() {
  const user = useAuth((s) => s.user)
  const params = useParams<{ examId: string }>()
  const examId = params.examId ? parseInt(params.examId, 10) : 0
  const navigate = useNavigate()

  const { data: exam, status } = useExam(examId, { enabled: Boolean(examId) })
  const { data: classData } = useClass(exam?.classId as number, {
    enabled: Boolean(exam?.classId),
  })

  if (status !== 'success' || !user) return <div>loading</div>

  const hasFinishedEarly = isEarly(exam.startTime, exam.endTime)
  const now = new Date()

  const examHasEnded = dayjs(now).isAfter(exam.endTime)

  const timeDescription = examHasEnded
    ? `Exam has ended 
    ${formatFromNow(exam.endTime)}.
        Finish this exam to start another.`
    : `You still have 
    ${dayjs(exam.endTime).diff(now, 'minutes')}
     minutes left to continue taking the exam. Finish now?`

  return (
    <Layout css={{ py: '1.5rem', px: '1.5rem' }}>
      <Header>
        <Logo />
      </Header>
      <Flex direction="column" css={{ h: '100%' }} gap="1">
        <Text
          as="p"
          color="bloo-light-20"
          css={{
            alignSelf: 'start',
            marginTop: '1rem',
            marginBottom: '0.75rem',
          }}
        >
          You are currently taking ...
        </Text>
        <Text as="h1" color="bloo-light-primary" fontSize="4xl">
          {exam.name}
        </Text>
        {exam.description ? (
          <ExamInfo title="Description" detail={exam.description} />
        ) : null}
        <ExamInfo
          title="Schedule"
          detail={formatSchedule(
            exam.startTime.toJSON(),
            exam.endTime.toJSON()
          )}
        />
        {classData ? (
          <ExamInfo title="Section" detail={classData.section} />
        ) : null}
        <ExamInfo title="Platform" detail={PlatformMap[exam.platform]} />
        <Text
          as="p"
          fontSize="sm"
          color="bloo-dark-primary"
          weight="semibold"
          css={{ textAlign: 'center', marginTop: '2rem' }}
        >
          {timeDescription}
        </Text>

        <Dialog.Root>
          <Dialog.Trigger size="base" variant="primary">
            Finish Exam
          </Dialog.Trigger>
          <Dialog.Content css={{ display: 'flex', flexDirection: 'column' }}>
            <Dialog.Title
              fontSize="lg"
              color="bloo-light-primary"
              weight="bold"
              css={{ mb: '$2' }}
            >
              Are you sure?
            </Dialog.Title>
            <Dialog.Description css={{ mb: '$6' }}>
              You won&apos;t be able to take the exam anymore.
            </Dialog.Description>

            <Flex gap="3" css={{ ml: 'auto' }}>
              <Dialog.Close asChild>
                <Button variant="unstyled" size="base" css={{ fontSize: '$1' }}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button
                  variant="primary"
                  size="base"
                  css={{ fontSize: '$1' }}
                  onClick={() => {
                    create({
                      name: 'FINISHED_EXAM',
                      description: hasFinishedEarly
                        ? 'quickly finished the exam.'
                        : 'has finished the exam',
                      examId,
                      examineeId: user.id,
                      isSuspicious: hasFinishedEarly,
                    }).then(() => {
                      chrome.storage.sync.clear()
                      navigate('/exams')
                    })
                  }}
                >
                  Finish Exam
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Layout>
  )
}

const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  w: '100%',
})

function ExamInfo({ detail, title }: { title: string; detail: string }) {
  return (
    <Flex direction="column" css={{ maxWidth: '40ch' }}>
      <Text color="bloo-light-primary">{title}</Text>

      <Text color="bloo-light-primary" weight="bold">
        {detail}
      </Text>
    </Flex>
  )
}

const PlatformMap: Record<Platform, string> = {
  TEAMS: 'Microsoft Teams',
  GOOGLE_FORMS: 'Google Forms',
  MOODLE: 'Moodle',
}
