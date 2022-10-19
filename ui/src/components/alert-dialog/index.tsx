import React from 'react'
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps as ChakraAlertDialogProps
} from '@chakra-ui/react'

export interface AlertDialogProps extends Omit<ChakraAlertDialogProps, 'children'> {
  header?: React.ReactNode
  body?: React.ReactNode
  footer?: React.ReactNode
  children?: ChakraAlertDialogProps['children']
}

export function AlertDialog({
  body,
  children,
  footer,
  header,
  ...props
}: AlertDialogProps) {
  return (
    <ChakraAlertDialog
      {...props}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          { header && (
            <AlertDialogHeader>
              { header }
            </AlertDialogHeader>
          ) }
          { (children || body) && (
            <AlertDialogBody>
              { children || body }
            </AlertDialogBody>
          ) }
          { footer && (
            <AlertDialogFooter>
              { footer }
            </AlertDialogFooter>
          ) }
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  )
}
