import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  AlertIcon,
  Button,
  chakra,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  ListItem,
  UnorderedList,
  VStack
} from '@chakra-ui/react'
import { MdError } from 'react-icons/md'

import axiosInstance from '@axios'
import { Authorized } from '@components'

export const resetPassword = {
  path: '/reset-password/',
  key: 'reset-password',
  element: <Element />
}

function Element(props) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleResetPasswordConfirm = e => {
    e.preventDefault()
    const params = new URLSearchParams(window.location.search)
    setLoading(true)
    setErrors({})
    axiosInstance.post(
      '/auth/users/reset_password_confirm/',
      {
        uid: params.get('u'),
        token: params.get('t'),
        new_password: password,
        re_new_password: password
      }
    )
      .then(() => {
        navigate('/login/')
      })
      .catch(err => {
        setErrors(err.response.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
        <chakra.form
          layerStyle="card"
          onSubmit={ handleResetPasswordConfirm }
        >
          <VStack spacing="5">
            { (!!errors.uid || !!errors.token) && (
              <Alert status="error">
                <AlertIcon
                  as={ MdError }
                />
                Password reset link expired or invalid.
              </Alert>
            ) }
            <FormControl isInvalid={ errors.new_password }>
              <FormLabel htmlFor="password">New Password</FormLabel>
              <Input
                id="password"
                type="password"
                onChange={ e => setPassword(e.target.value) }
                value={ password }
                required
              />
              <FormErrorMessage>
                <UnorderedList>
                  { errors.new_password?.map(err => (
                    <ListItem key={ err }>{ err }</ListItem>
                  )) }
                </UnorderedList>
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              isLoading={ loading }
              colorScheme="blue"
              w="full"
            >
              Reset Password
            </Button>
          </VStack>
        </chakra.form>
      </Container>
    </Authorized>
  )
}
