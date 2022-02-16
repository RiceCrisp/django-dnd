import React from 'react'
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from '@chakra-ui/react'

export function AlertDialog({
  body,
  children,
  footer,
  header,
  isOpen,
  leastDestructiveRef,
  onClose,
  ...props
}) {
  return (
    <ChakraAlertDialog
      isOpen={ isOpen }
      leastDestructiveRef={ leastDestructiveRef }
      onClose={ onClose }
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            { header }
          </AlertDialogHeader>
          <AlertDialogBody>
            { children || body }
          </AlertDialogBody>
          <AlertDialogFooter>
            { footer }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  )
}
