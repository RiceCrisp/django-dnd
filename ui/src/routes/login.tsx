import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  useToast
} from '@chakra-ui/react'

import { Authorized, ForgotPasswordForm, LoginForm } from '~/components'

export const login = {
  path: '/login/',
  key: 'login',
  element: <Element />
}

function Element() {
  const [requestingPasswordReset, setRequestingPasswordReset] = useState(false)

  const navigate = useNavigate()

  const toast = useToast()

  return (
    <Authorized
      loggedIn="/profile/"
    >
      <Container maxW="400">
        <Heading
          as="h1"
          mb="4"
        >
          Login
        </Heading>
        <Box layerStyle="card">
          { requestingPasswordReset
            ? (
              <>
                <ForgotPasswordForm
                  onSuccess={() => {
                    toast({
                      status: 'info',
                      description: 'If an account is found with this email address, you will receive a password reset link within the next couple minutes.',
                      duration: 10000,
                      isClosable: true
                    })
                    setRequestingPasswordReset(false)
                  }}
                />
                <Center mt={5}>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={ () => setRequestingPasswordReset(false) }
                  >
                    ← Back to login
                  </Button>
                </Center>
              </>
            )
            : (
              <>
                <LoginForm
                  onSuccess={ () => {
                    navigate('/profile/')
                  } }
                />
                <Center mt={5}>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={ () => setRequestingPasswordReset(true) }
                  >
                    Forgot Password?
                  </Button>
                </Center>
              </>
            )
          }
        </Box>
      </Container>
    </Authorized>
  )
}
