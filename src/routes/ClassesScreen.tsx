import { Link } from 'react-router-dom'
import { styled } from '../../stitches.config'
import Button from '../components/Button'
import Flex from '../components/Flex'
import Layout from '../components/Layout'
import Logo from '../components/Logo'
import Text from '../components/Text'
import * as Dialog from '../components/Dialog'

import useClasses, { useEnrolMutation } from '../utils/hooks/useClasses'
import useAuth from '../utils/stores/auth'
import { useState } from 'react'
import TextField from '../components/TextField'
import ClassCard from '../components/ClassCard'

export default function ClassesScreen() {
  const [open, setOpen] = useState(false)
  const [code, setcode] = useState('')
  const user = useAuth((state) => state.user)

  const { data: classes, isLoading } = useClasses({
    params: { examineeId: user?.id },
    options: { enabled: Boolean(user?.id) },
  })

  const { mutate } = useEnrolMutation()

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
        <Flex justify="between">
          <Text as="h1" color="bloo-light-primary" fontSize="2xl">
            Classes
          </Text>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger size="sm" variant="primary">
              Enroll
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title
                fontSize="lg"
                color="bloo-light-primary"
                weight="bold"
                css={{ mb: '$6' }}
              >
                Enrol to Class
              </Dialog.Title>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  mutate({ examineeId: user?.id as number, code })
                  setOpen(false)
                }}
              >
                <Text as="label" color="bloo-light-primary" fontSize="sm">
                  Class Code
                </Text>
                <Flex gap="3">
                  <TextField
                    value={code}
                    onChange={(e) => setcode(e.currentTarget.value)}
                    variant="outlined"
                    color="bloo-light-primary"
                    css={{ width: 150, flexShrink: 1 }}
                  />
                  <Button
                    variant="primary"
                    size="base"
                    css={{ fontSize: '$1' }}
                  >
                    Enrol
                  </Button>
                </Flex>
              </form>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
        <Flex direction="column" css={{ mt: '$4' }}>
          {classes?.length ? (
            classes.map((classData) => (
              <ClassCard classData={classData} key={classData.id} />
            ))
          ) : (
            <Text color="bloo-light-primary">
              Not enrolled in any class{' '}
              <Button size="sm" onClick={() => setOpen(true)}>
                Enrol
              </Button>
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
