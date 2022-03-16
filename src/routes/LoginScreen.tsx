import { ReactNode, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'

import { css, styled } from '../../stitches.config'
import Layout from '../components/Layout'
import TextField, { sharedStyles } from '../components/TextField'
import Button from '../components/Button'
import Box from '../components/Box'
import Text from '../components/Text'

interface FormFields {
  email: string
  password: string
}

export default function LoginScreen() {
  const [show, toggle] = useReducer((show) => !show, false)
  const { register, handleSubmit } = useForm<FormFields>()

  const onSubmit = (values: FormFields) => {
    console.log(values)
  }

  return (
    <Layout
      css={{
        border: '2px solid $bloo-light-primary',
        borderRadius: '$10',
        ml: '$4',
        mt: '$4',
      }}
    >
      <Box
        css={{
          px: '$4',
          py: '$2',
          position: 'relative',
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StlyedForm onSubmit={handleSubmit(onSubmit)}>
          <FeildSet label="Institutional Email">
            <TextField
              variant="outlined"
              color="bloo-light-primary"
              placeholder="john.doe@cit.edu"
              fontSize="sm"
              {...register('email')}
            />
          </FeildSet>

          <FeildSet label="Password">
            <TextFieldWrapper variant="outlined" color="bloo-light-primary">
              <TextField
                type={show ? 'text' : 'password'}
                fontSize="sm"
                css={{ color: 'inherit' }}
                {...register('password')}
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
      </Box>
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

  position: 'absolute',
  top: '40%',
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
      <Text fontSize="sm" color="bloo-dark-20" as="label">
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
