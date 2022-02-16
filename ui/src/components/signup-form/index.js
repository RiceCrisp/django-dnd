import React, { useState } from 'react'
import {
  Alert,
  AlertIcon,
  Button,
  FormLabel,
  Input,
  VStack,
  chakra
} from '@chakra-ui/react'
import { MdError } from 'react-icons/md'

import axiosInstance from '@axios'
import { FormControl } from '@components'

export function SignUpForm({
  onSuccess,
  ...props
}) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSignUpSubmit = async e => {
    e.preventDefault()
    if (loading === true) {
      return
    }
    setLoading(true)
    setErrors({})
    try {
      const response = await axiosInstance.post('/auth/users/', {
        email: email,
        username: username,
        password: password,
        re_password: password
      })
      if (response.status === 201) {
        onSuccess()
      }
      else {
        setErrors({ detail: 'Something went wrong. Try again.' })
      }
    }
    catch (err) {
      setErrors(err.response.data)
    }
    setLoading(false)
  }

  return (
    <chakra.form
      onSubmit={ handleSignUpSubmit }
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
        <FormControl errors={ errors.email }>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            id="email"
            type="email"
            onChange={ e => setEmail(e.target.value) }
            value={ email }
            required
          />
        </FormControl>
        <FormControl errors={ errors.username }>
          <FormLabel htmlFor="username">User Name</FormLabel>
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
          isLoading={ loading }
          colorScheme="blue"
        >
          Create Account
        </Button>
      </VStack>
    </chakra.form>
  )
}
