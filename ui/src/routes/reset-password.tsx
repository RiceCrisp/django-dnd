import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Heading,
  useToast
} from '@chakra-ui/react'

import { Authorized, ResetPasswordForm } from '~/components'

export const resetPassword = {
  path: '/reset-password/',
  key: 'reset-password',
  element: <Element />
}

function Element() {
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
          Reset Password
        </Heading>
        <ResetPasswordForm
          layerStyle="card"
          onSuccess={ () => {
            toast({
              status: 'info',
              description: 'Password updated. Please login with new credentials.',
              duration: 10000,
              isClosable: true
            })
            navigate('/login/')
          } }
        />
      </Container>
    </Authorized>
  )
}
