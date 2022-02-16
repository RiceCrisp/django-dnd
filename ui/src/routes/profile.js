import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  chakra
} from '@chakra-ui/react'

import { Authorized } from '@components'
import { actions } from '@stores/current-user'

export const profile = {
  path: '/profile/',
  key: 'profile',
  element: <Element />
}

function Element(props) {
  const [fields, setFields] = useState({
    firstName: '',
    lastName: ''
  })
  const [loading, setLoading] = useState(false)

  const {
    username,
    email,
    firstName,
    lastName
  } = useSelector(state => state.currentUser)

  useEffect(() => {
    setFields({
      firstName,
      lastName
    })
  }, [firstName, lastName, setFields])

  const dispatch = useDispatch()

  const handleUserUpdateSubmit = e => {
    e.preventDefault()
    setLoading(true)
    dispatch(actions.updateUser(fields))
      .then(() => {
        setLoading(false)
      })
  }

  return (
    <Authorized
      loggedOut="/login/"
    >
      <Container maxW="container.lg">
        <Heading
          as="h1"
        >
          Profile
        </Heading>
        <Heading
          as="h2"
          my="4"
        >
          Welcome { firstName } { lastName }
        </Heading>
        <chakra.form
          layerStyle="card"
          onSubmit={ handleUserUpdateSubmit }
        >
          <VStack spacing="5">
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="text"
                value={ username }
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="text"
                value={ email }
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                type="text"
                onChange={ e => setFields({ ...fields, firstName: e.target.value }) }
                value={ fields.firstName }
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                id="lastName"
                type="text"
                onChange={ e => setFields({ ...fields, lastName: e.target.value }) }
                value={ fields.lastName }
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={ loading }
            >
              Save
            </Button>
          </VStack>
        </chakra.form>
      </Container>
    </Authorized>
  )
}
