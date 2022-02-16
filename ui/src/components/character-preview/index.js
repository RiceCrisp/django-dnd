import React from 'react'
import {
  chakra,
  HStack,
  IconButton
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { MdDragIndicator, MdVisibility } from 'react-icons/md'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { NumberInput } from '@components'
import { actions } from '@stores/characters'

export function CharacterPreview({
  value: character,
  onChange,
  onSubmit,
  ...props
}) {
  const dispatch = useDispatch()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: character.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  }

  return (
    <chakra.form
      layerStyle="card"
      p="4"
      onSubmit={ e => {
        e.preventDefault()
        onSubmit(character)
      } }
      ref={ setNodeRef }
      style={ style }
      { ...props }
    >
      <HStack>
        <IconButton
          aria-label="Reorder"
          size="sm"
          icon={ <MdDragIndicator /> }
          cursor="move"
          { ...attributes }
          { ...listeners }
        />
        { character.name ? (
          <b>{ character.name }</b>
        ) : (
          <i>No Name</i>
        ) }
        <HStack
          alignItems="center"
        >
          <NumberInput
            w="5em"
            size="sm"
            onChange={ newValue => onChange({ ...character, hp: newValue }) }
            value={ character.hp }
          />
          <chakra.span>/</chakra.span>
          <NumberInput
            w="5em"
            size="sm"
            onChange={ newValue => onChange({ ...character, maxHp: newValue }) }
            value={ character.maxHp }
          />
        </HStack>
        <IconButton
          aria-label="Inspect Character"
          size="sm"
          icon={ <MdVisibility /> }
          onClick={ () => dispatch(actions.setCharacterFocus(character.id)) }
        />
      </HStack>
    </chakra.form>
  )
}
