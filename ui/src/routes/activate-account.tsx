import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Heading,
  useToast
} from '@chakra-ui/react'

import axiosInstance from '~/axios'
import { Authorized } from '~/components'

export const activateAccount = {
  path: '/activate/',
  key: 'activate',
  element: <Element />
}

function Element() {
  const [errorCode, setErrorCode] = useState('')

  const navigate = useNavigate()

  const toast = useToast()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setErrorCode('')
    axiosInstance.post(
      '/auth/users/activation/',
      {
        uid: params.get('u'),
        token: params.get('t')
      }
    )
      .then(() => {
        toast({
          status: 'success',
          title: 'Account activated!',
          description: 'Please login to begin.',
          duration: 10000,
          isClosable: true
        })
        navigate('/login/')
      })
      .catch((err) => {
        console.log(err.response.status)
        setErrorCode(String(err.response.status))
      })
  }, [navigate, toast])

  return (
    <Authorized
      loggedIn="/profile/"
    >
      <Container maxW="500">
        {!errorCode
          ? (
            <Heading
              as="h1"
              mb="4"
            >
            Activating. Just a moment...
            </Heading>
          )
          : (
            <>
              <Heading
                as="h1"
                mb="4"
              >
                {errorCode === '403' ? 'This activation link has expired.' : 'Something has gone wrong.'}
              </Heading>
            </>
          )}
      </Container>
    </Authorized>
  )
}
