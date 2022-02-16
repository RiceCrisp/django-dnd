import {
  FormControl as ChakraFormControl,
  FormErrorMessage,
  ListItem,
  UnorderedList
} from '@chakra-ui/react'
import React from 'react'

export function FormControl({
  children,
  errors,
  label,
  ...props
}) {
  return (
    <ChakraFormControl
      isInvalid={ errors }
      { ...props }
    >
      { children }
      <FormErrorMessage>
        <UnorderedList>
          { !!errors && errors.map(err => {
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
