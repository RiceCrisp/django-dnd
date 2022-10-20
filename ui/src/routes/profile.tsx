import React, { useEffect, useState } from 'react'
import {
  Container,
  Button,
  FormLabel,
  Heading,
  Input,
  VStack,
  chakra
} from '@chakra-ui/react'

import { Authorized, FormControl } from '~/components'
import { actions } from '~/stores/current-user'
import { useAppDispatch, useAppSelector } from '~/hooks'

export const profile = {
  path: '/profile/',
  key: 'profile',
  element: <Element />
}

function Element() {
  const [fields, setFields] = useState({
    firstName: '',
    lastName: ''
  })
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(false)

  const {
    username,
    email,
    firstName,
    lastName
  } = useAppSelector((state) => state.currentUser)

  useEffect(() => {
    setFields({
      firstName: firstName || '',
      lastName: lastName || ''
    })
  }, [firstName, lastName, setFields])

  const dispatch = useAppDispatch()

  const handleUserUpdateSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await dispatch(actions.updateUser(fields))
    }
    catch (err) {
      const error = err as Record<string, string[]>
      setErrors(error)
    }
    finally {
      setLoading(false)
    }
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
            <FormControl errors={ errors.username }>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="text"
                value={ username }
                readOnly
              />
            </FormControl>
            <FormControl errors={ errors.email }>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="text"
                value={ email }
                readOnly
              />
            </FormControl>
            <FormControl errors={ errors.first_name }>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                type="text"
                onChange={ (e) => setFields({ ...fields, firstName: e.target.value }) }
                value={ fields.firstName }
              />
            </FormControl>
            <FormControl errors={ errors.last_name }>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                id="lastName"
                type="text"
                onChange={ (e) => setFields({ ...fields, lastName: e.target.value }) }
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
