import React from 'react'
import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'

export interface NumberInputProps extends Omit<ChakraNumberInputProps, 'onChange'> {
  onChange: (arg: number) => void
}

export function NumberInput({
  onChange,
  ...props
}: NumberInputProps) {
  return (
    <ChakraNumberInput
      onChange={ (_valueAsString, valueAsNumber) => onChange(valueAsNumber) }
      { ...props }
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  )
}
