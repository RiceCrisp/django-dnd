import React from 'react'
import { Container, Heading } from '@chakra-ui/react'

export const home = {
  path: '/',
  key: 'root',
  element: <Element />
}

function Element() {
  return (
    <Container maxW="container.lg">
      <Heading as="h1">Home</Heading>
    </Container>
  )
}
