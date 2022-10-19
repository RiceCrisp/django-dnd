import React from 'react'
import {
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps
} from '@chakra-ui/react'

export interface ModalProps extends Omit<ChakraModalProps, 'children'> {
  header?: React.ReactNode
  body?: React.ReactNode
  footer?: React.ReactNode
  children?: ChakraModalProps['children']
}

export function Modal({
  body,
  children,
  footer,
  header,
  ...props
}: ModalProps) {
  return (
    <ChakraModal
      isCentered
      scrollBehavior="inside"
      { ...props }
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          { header }
        </ModalHeader>
        <ModalBody>
          { children || body }
        </ModalBody>
        <ModalFooter>
          { footer }
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
