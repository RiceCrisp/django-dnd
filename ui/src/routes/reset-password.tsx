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

import axiosInstance from '~/axios'
import { Authorized } from '~/components'
import { AxiosError } from 'axios'

export const resetPassword = {
  path: '/reset-password/',
  key: 'reset-password',
  element: <Element />
}

function Element() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const navigate = useNavigate()

  const handleResetPasswordConfirm: React.FormEventHandler = async (e) => {
    e.preventDefault()
    const params = new URLSearchParams(window.location.search)
    setLoading(true)
    setErrors({})
    try {
      await axiosInstance.post(
        '/auth/users/reset_password_confirm/',
        {
          uid: params.get('u'),
          token: params.get('t'),
          new_password: password,
          re_new_password: password
        }
      )
      navigate('/login/')
    }
    catch (err) {
      const error = err as AxiosError
      setErrors(error.response?.data)
    }
    finally {
      setLoading(false)
    }
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
                onChange={ (e) => setPassword(e.target.value) }
                value={ password }
                required
              />
              <FormErrorMessage>
                <UnorderedList>
                  { errors.new_password?.map((err: string) => (
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
