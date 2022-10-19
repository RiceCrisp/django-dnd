import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Heading
} from '@chakra-ui/react'

import { actions } from '~/stores/current-user'
import { useAppDispatch } from '~/hooks'

export const logout = {
  path: '/logout/',
  key: 'logout',
  element: <Element />
}

function Element() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const asyncFunction = async () => {
      await dispatch(actions.logoutUser())
      navigate('/')
    }
    asyncFunction()
  }, [dispatch, navigate])

  return (
    <Container maxW="container.sm">
      <Heading
        as="h1"
      >
        Signing out...
      </Heading>
    </Container>
  )
}
