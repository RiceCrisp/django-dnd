import React from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react'

export function Modal({
  body,
  children,
  footer,
  header,
  isOpen,
  onClose,
  ...props
}) {
  return (
    <ChakraModal
      isOpen={ isOpen }
      onClose={ onClose }
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
