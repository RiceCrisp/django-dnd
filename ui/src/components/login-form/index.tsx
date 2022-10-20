import React, { useState } from 'react'
import {
  Alert,
  AlertIcon,
  Button,
  FormLabel,
  Input,
  VStack,
  chakra,
  ChakraProps
} from '@chakra-ui/react'
import { MdError } from 'react-icons/md'

import { FormControl } from '~/components'
import { actions } from '~/stores/current-user'
import { useAppDispatch } from '~/hooks'

export interface LoginFormProps extends ChakraProps {
  onSuccess: () => void
}

export function LoginForm({
  onSuccess,
  ...props
}: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const dispatch = useAppDispatch()

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
      const error = err as Record<string, string[]>
      setErrors(error)
    }
    finally {
      setLoading(false)
    }
  }

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
          isLoading={ loading }
          colorScheme="blue"
          w="full"
        >
          Login
        </Button>
      </VStack>
    </chakra.form>
  )
}
