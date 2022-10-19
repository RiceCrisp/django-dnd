import React, { useState } from 'react'
import {
  Alert,
  AlertIcon,
  Button,
  FormLabel,
  Input,
  Text,
  VStack,
  chakra,
  useToast,
  ChakraProps
} from '@chakra-ui/react'
import { MdError } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import axiosInstance from '~/axios'
import { FormControl } from '~/components'
import { actions } from '~/stores/current-user'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '~/hooks'

export interface LoginFormProps extends ChakraProps {
  onSuccess: () => void
}

export function LoginForm({
  onSuccess,
  ...props
}: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [requestingPasswordReset, setRequestingPasswordReset] = useState(false)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const toast = useToast

  const { status } = useAppSelector((state) => state.currentUser)

  const handleLoginSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    try {
      await dispatch(actions.loginUser({
        username,
        password
      }))
      onSuccess()
    }
    catch (err) {
      const error = err as Record<string, string>
      setErrors(error)
    }
    finally {
      setLoading(false)
    }
  }

  const handlePasswordResetRequest: React.FormEventHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axiosInstance.post('/auth/users/reset_password/', {
        email
      })
      if (response.status === 200) {
        toast({
          status: 'info',
          description: 'If an account is found with this email address, you should receive a password reset link within the next couple minutes.',
          duration: 10000,
          isClosable: true
        })
        navigate('/login/')
      }
      else {
        setErrors({ detail: 'Something went wrong. Try again.' })
      }
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
    <>
      {requestingPasswordReset
        ? (
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
                  onChange={ (e) => setEmail(e.target.value) }
                  value={ email }
                  required
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                w="full"
                isLoading={ loading }
              >
              Send Email
              </Button>
            </VStack>
          </chakra.form>
        )
        : (
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
                  onChange={ (e) => setUsername(e.target.value) }
                  value={ username }
                  required
                />
              </FormControl>
              <FormControl errors={ errors.password }>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={ (e) => setPassword(e.target.value) }
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
                onClick={ () => setRequestingPasswordReset(true) }
              >
              Forgot Password?
              </Button>
            </VStack>
          </chakra.form>
        )}
    </>
  )
}
