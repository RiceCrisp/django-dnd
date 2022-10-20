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

import axiosInstance from '~/axios'
import { FormControl } from '~/components'
import { AxiosError } from 'axios'

export interface SignUpFormProps extends ChakraProps {
  onSuccess: () => void
}

export function ResetPasswordForm({
  onSuccess,
  ...props
}: SignUpFormProps) {
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(false)

  const handleResetPasswordConfirm: React.FormEventHandler = async (e) => {
    e.preventDefault()
    const params = new URLSearchParams(window.location.search)
    setLoading(true)
    setErrors({})
    try {
      const response = await axiosInstance.post(
        '/auth/users/reset_password_confirm/',
        {
          uid: params.get('u'),
          token: params.get('t'),
          new_password: password,
          re_new_password: password
        }
      )
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

  return (
    <chakra.form
      layerStyle="card"
      onSubmit={ handleResetPasswordConfirm }
      {...props}
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
        <FormControl errors={ errors.new_password }>
          <FormLabel htmlFor="password">New Password</FormLabel>
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
          Reset Password
        </Button>
      </VStack>
    </chakra.form>
  )
}
