import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Heading
} from '@chakra-ui/react'
import { MdCheckCircle } from 'react-icons/md'

import { SignUpForm } from '@components'

export const signUp = {
  path: '/sign-up/',
  key: 'sign-up',
  element: <Element />
}

function Element(props) {
  const [success, setSuccess] = useState(false)

  return (
    <Container maxW="container.sm">
      <Heading
        as="h1"
        mb="4"
      >
        Sign Up
      </Heading>
      { success ? (
        <Alert
          status="success"
          flexDirection="column"
          textAlign="center"
          py="5"
        >
          <AlertIcon
            as={ MdCheckCircle }
            boxSize="icon.lg"
          />
          <AlertTitle
            fontSize="lg"
            mt="3"
            mb="4"
          >
            Account created!
          </AlertTitle>
          <Button
            colorScheme="green"
            as={ RouterLink }
            to={ '/login/' }
          >
            Login
          </Button>
        </Alert>
      ) : (
        <SignUpForm
          layerStyle="card"
          onSuccess={ () => setSuccess(true) }
        />
      ) }
    </Container>
  )
}
