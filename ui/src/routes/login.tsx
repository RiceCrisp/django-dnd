import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Heading
} from '@chakra-ui/react'

import { Authorized, LoginForm } from '~/components'

export const login = {
  path: '/login/',
  key: 'login',
  element: <Element />
}

function Element() {
  const navigate = useNavigate()

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
        <LoginForm
          layerStyle="card"
          onSuccess={ () => {
            navigate('/profile/')
          } }
        />
      </Container>
    </Authorized>
  )
}
