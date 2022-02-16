import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Heading
} from '@chakra-ui/react'

import { actions } from '@stores/current-user'

export const logout = {
  path: '/logout/',
  key: 'logout',
  element: <Element />
}

function Element(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(actions.logoutUser())
      .then(() => {
        navigate('/')
      })
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
