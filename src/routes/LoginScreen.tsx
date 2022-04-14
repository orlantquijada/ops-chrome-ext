import { ReactNode, useReducer } from 'react'
import { useForm } from 'react-hook-form'

import { css, styled } from '../../stitches.config'
import Layout from '../components/Layout'
import TextField, { sharedStyles } from '../components/TextField'
import Button from '../components/Button'
import Box from '../components/Box'
import Text from '../components/Text'
import Logo from '../components/Logo'
import Flex from '../components/Flex'
import useAuth from '../utils/stores/auth'
import { Navigate, useNavigate } from 'react-router-dom'

interface FormFields {
  email: string
  password: string
}

export default function LoginScreen() {
  const signin = useAuth((s) => s.signin)
  const user = useAuth((s) => s.user)
  const navigate = useNavigate()
  const [show, toggle] = useReducer((show) => !show, false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>()

  const onSubmit = async (values: FormFields) => {
    try {
      await signin(values).then(() => {
        navigate('/exams')
      })
    } catch (error) {
      alert('asdasd')
    }
  }

  if (user) {
    return <Navigate to="/exams" state={{ from: location }} replace />
  }

  return (
    <Layout>
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="5"
        css={{ mx: 'auto', position: 'relative', h: '100%', w: 'fit-content' }}
      >
        <Box css={{ position: 'absolute', top: '1.5rem', left: '0' }}>
          <Logo />
        </Box>
        <Box css={{ w: '100%', pt: '$9' }}>
          <Text
            as="h1"
            fontSize="3xl"
            color="bloo-light-primary"
            weight="extrabold"
          >
            Log in
          </Text>
          <Text
            as="h4"
            fontSize="base"
            color="bloo-dark-primary"
            weight="semibold"
          >
            Sign in to continue!
          </Text>
        </Box>
        <StlyedForm onSubmit={handleSubmit(onSubmit)}>
          <FeildSet label="Institutional Email" error={errors.email?.message}>
            <TextField
              variant="outlined"
              color="bloo-light-primary"
              placeholder="john.doe@cit.edu"
              fontSize="sm"
              type="email"
              {...register('email', {
                required: 'required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'invalid email',
                },
              })}
            />
          </FeildSet>

          <FeildSet label="Password" error={errors.password?.message}>
            <TextFieldWrapper variant="outlined" color="bloo-light-primary">
              <TextField
                type={show ? 'text' : 'password'}
                fontSize="sm"
                css={{ color: 'inherit' }}
                {...register('password', { required: 'required' })}
              />
              <Button
                type="button"
                variant="unstyled"
                size="sm"
                css={{ px: 0, width: '2rem', outline: 'none' }}
                onClick={toggle}
              >
                {show ? 'Hide' : 'Show'}
              </Button>
            </TextFieldWrapper>
          </FeildSet>
          <Button variant="primary">Log in</Button>
        </StlyedForm>
      </Flex>
    </Layout>
  )
}

const TextFieldWrapper = styled('div', sharedStyles, {
  display: 'flex',
  alignItems: 'center',
  pr: '$2',
})

const StlyedForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
})

const fieldStyles = css({
  display: 'grid',
  gridTemplateAreas: '"label" "input"',
  rowGap: '$1',

  width: '100%',

  'fieldset&': {
    border: 'none',
    p: 0,
    m: 0,
  },
  [`& label${Text}`]: {
    gridArea: 'label',
  },
  [`& ${TextField}`]: {
    gridArea: 'input',
  },

  variants: {
    variant: {
      error: {
        '& *': {
          color: '$error',
        },
      },
    },
  },
})

function FeildSet({
  label,
  error,
  children,
}: {
  label?: string
  error?: string
  children: ReactNode
}) {
  const hasError = Boolean(error)
  return (
    <fieldset
      className={fieldStyles({ variant: hasError ? 'error' : undefined })}
    >
      <Text fontSize="sm" color="bloo-light-10" as="label">
        {label}
      </Text>
      {children}
      {hasError ? (
        <Text
          fontSize="xs"
          color="error"
          as="small"
          css={{ wordWrap: 'break-word' }}
        >
          {error}
        </Text>
      ) : null}
    </fieldset>
  )
}
