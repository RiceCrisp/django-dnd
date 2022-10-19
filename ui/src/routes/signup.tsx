import React, { useState } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Container,
  Heading
} from '@chakra-ui/react'
import { MdEmail } from 'react-icons/md'

import { SignUpForm } from '~/components'

export const signUp = {
  path: '/sign-up/',
  key: 'sign-up',
  element: <Element />
}

function Element() {
  const [success, setSuccess] = useState(false)

  return (
    <Container maxW="container.sm">
      <Heading
        as="h1"
        mb="4"
      >
        Sign Up
      </Heading>
      { !success
        ? (
          <Alert
            status="info"
            flexDirection="column"
            py="5"
          >
            <AlertIcon
              as={ MdEmail }
            />
            <AlertTitle>
            Check your email!
            </AlertTitle>
          An account activation link has been sent to your email.
          </Alert>
        )
        : (
          <SignUpForm
            layerStyle="card"
            onSuccess={ () => setSuccess(true) }
          />
        ) }
    </Container>
  )
}
