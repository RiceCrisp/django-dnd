import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  FormLabel,
  Input,
  Text,
  VStack,
  chakra,
  ChakraProps
} from '@chakra-ui/react'

import axiosInstance from '~/axios'
import { FormControl } from '~/components'
import { AxiosError } from 'axios'

export interface ForgotPasswordFormProps extends ChakraProps {
  onSuccess: () => void
}

export function ForgotPasswordForm({
  onSuccess,
  ...props
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const ref = useRef<HTMLInputElement>(null)

  const handlePasswordResetRequest: React.FormEventHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axiosInstance.post('/auth/users/reset_password/', {
        email
      })
      if (response.status === 204) {
        onSuccess()
      }
      else {
        setErrors({ detail: ['Something went wrong. Try again.'] })
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

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

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
            onChange={ (e) => setEmail(e.target.value) }
            value={ email }
            required
            ref={ref}
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
}
