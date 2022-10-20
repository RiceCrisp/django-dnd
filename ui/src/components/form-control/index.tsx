import {
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
  FormErrorMessage,
  ListItem,
  UnorderedList
} from '@chakra-ui/react'
import React from 'react'

export interface FormControlProps extends ChakraFormControlProps {
  errors?: string[]
}

export function FormControl({
  children,
  errors,
  ...props
}: FormControlProps) {
  return (
    <ChakraFormControl
      isInvalid={ !!errors }
      { ...props }
    >
      { children }
      <FormErrorMessage>
        <UnorderedList>
          { !!errors && errors.map((err: string) => {
            err = err === '"" is not a valid choice.' ? 'This field may not be blank.' : err
            return (
              <ListItem key={ err }>{ err }</ListItem>
            )
          }) }
        </UnorderedList>
      </FormErrorMessage>
    </ChakraFormControl>
  )
}
