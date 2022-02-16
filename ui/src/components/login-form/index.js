import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  FormLabel,
  Input,
  Text,
  VStack,
  chakra
} from '@chakra-ui/react'
import { MdError, MdInfo } from 'react-icons/md'

import axiosInstance from '@axios'
import { FormControl } from '@components'
import { actions } from '@stores/current-user'

export function LoginForm({
  onSuccess,
  ...props
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [requestingPasswordReset, setRequestingPasswordReset] = useState(0)

  const dispatch = useDispatch()

  const { status } = useSelector(state => state.currentUser)

  const handleLoginSubmit = async e => {
    e.preventDefault()
    setErrors({})
    try {
      await dispatch(actions.loginUser({
        username: username,
        password: password
      })).unwrap()
    }
    catch (err) {
      setErrors(err)
    }
  }

  const handlePasswordResetRequest = e => {
    e.preventDefault()
    axiosInstance.post(
      '/auth/users/reset_password/',
      { email: email }
    )
      .then(() => {
        setRequestingPasswordReset('COMPLETE')
      })
      .catch(err => {
        setErrors(err.response.data)
      })
  }

  switch (requestingPasswordReset) {
    case 'REQUEST': {
      return (
        <chakra.form
          onSubmit={ handlePasswordResetRequest }
          { ...props }
        >
          <VStack spacing="5">
            <Text>Enter your email address, and we&apos;ll send you an email to reset your password.</Text>
            <FormControl errors={ errors.email }>
              <FormLabel htmlFor="email-reset">Email Address</FormLabel>
              <Input
                id="email-reset"
                type="email"
                onChange={ e => setEmail(e.target.value) }
                value={ email }
                required
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              w="full"
            >
              Send Email
            </Button>
          </VStack>
        </chakra.form>
      )
    }
    case 'COMPLETE': {
      return (
        <chakra.div
          { ...props }
        >
          <VStack spacing="5">
            <Alert
              status="info"
              textAlign="center"
              flexDirection="column"
              p="5"
            >
              <AlertIcon
                as={ MdInfo }
                boxSize="icon.md"
                mb="4"
              />
              <AlertTitle mb="4">Email Sent!</AlertTitle>
              <AlertDescription>If an account is found with that email address, you should receive a password reset link in a couple minutes.</AlertDescription>
            </Alert>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={ () => setRequestingPasswordReset('') }
            >
              Login
            </Button>
          </VStack>
        </chakra.div>
      )
    }
    default: {
      return (
        <chakra.form
          onSubmit={ handleLoginSubmit }
          { ...props }
        >
          <VStack spacing="5">
            { !!errors.detail && (
              <Alert status="error">
                <AlertIcon
                  as={ MdError }
                />
                { errors.detail }
              </Alert>
            ) }
            <FormControl errors={ errors.username }>
              <FormLabel htmlFor="username">Username or Email Address</FormLabel>
              <Input
                id="username"
                type="text"
                onChange={ e => setUsername(e.target.value) }
                value={ username }
                required
              />
            </FormControl>
            <FormControl errors={ errors.password }>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                onChange={ e => setPassword(e.target.value) }
                value={ password }
                required
              />
            </FormControl>
            <Button
              type="submit"
              isLoading={ status === 'PENDING' }
              colorScheme="blue"
              w="full"
            >
              Login
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={ () => setRequestingPasswordReset('REQUEST') }
            >
              Forgot Password?
            </Button>
          </VStack>
        </chakra.form>
      )
    }
  }
}
