import React, { useRef, useState } from 'react'
import {
  Button,
  chakra,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Tooltip,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { AlertDialog, FormControl, NumberInput } from '@components'
import { useAbilities, useSkills } from '@hooks'
import { actions as characterActions } from '@stores/characters'

export function Character({
  value: character,
  errors = {},
  onChange,
  onSubmit,
  ...props
}) {
  const dispatch = useDispatch()
  const deleteFormRef = useRef()
  const [deleting, setDeleting] = useState(false)
  const { id } = character
  const { abilityList } = useAbilities()
  const { skillList } = useSkills()

  const classes = useSelector(state => state.classes.classes)
  const races = useSelector(state => state.races.races)

  const {
    isOpen: deleteModalIsOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose
  } = useDisclosure()

  const onCharacterDelete = e => {
    e.preventDefault()
    setDeleting(true)
    dispatch(characterActions.deleteCharacter(character.id))
      .unwrap()
  }

  return (
    <chakra.form
      layerStyle="card"
      onSubmit={ e => {
        e.preventDefault()
        onSubmit(character)
      } }
      { ...props }
    >
      <VStack spacing="5">
        <FormControl
          errors={ errors.name }
        >
          <FormLabel htmlFor={ `character-name-${id}` }>Name</FormLabel>
          <Input
            id={ `character-name-${id}` }
            type="text"
            onChange={ e => onChange({ ...character, name: e.target.value }) }
            value={ character.name || '' }
          />
        </FormControl>
        <SimpleGrid
          columns="2"
          spacing="4"
          alignItems="flex-end"
        >
          <FormControl
            errors={ errors.hp }
          >
            <FormLabel htmlFor={ `character-hp-${id}` }>HP</FormLabel>
            <NumberInput
              id={ `character-hp-${id}` }
              onChange={ newValue => onChange({ ...character, hp: newValue }) }
              value={ character.hp }
            />
          </FormControl>
          <FormControl
            errors={ errors.maxHp }
          >
            <FormLabel htmlFor={ `character-max-hp-${id}` }>HP</FormLabel>
            <NumberInput
              id={ `character-max-hp-${id}` }
              onChange={ newValue => onChange({ ...character, maxHp: newValue }) }
              value={ character.maxHp }
            />
          </FormControl>
        </SimpleGrid>
        <FormControl
          errors={ errors.race }
        >
          <FormLabel htmlFor={ `character-race-${id}` }>Race</FormLabel>
          <Select
            id={ `character-race-${id}` }
            onChange={ e => onChange({ ...character, race: e.target.value }) }
            value={ character.race }
          >
            { races.map(r => {
              return (
                <option
                  key={ r.value }
                  value={ r.value }
                >
                  { r.display_name }
                </option>
              )
            }) }
          </Select>
        </FormControl>
        <FormControl
          errors={ errors._class }
        >
          <FormLabel htmlFor={ `character-class-${id}` }>Class</FormLabel>
          <Select
            id={ `character-class-${id}` }
            onChange={ e => onChange({ ...character, _class: e.target.value }) }
            value={ character._class }
          >
            { classes.map(c => {
              return (
                <option
                  key={ c.value }
                  value={ c.value }
                >
                  { c.display_name }
                </option>
              )
            }) }
          </Select>
        </FormControl>
        <fieldset>
          <legend>Abilities</legend>
          <SimpleGrid
            columns="3"
            spacing="4"
            alignItems="flex-end"
          >
            { abilityList.map(a => {
              return (
                <FormControl
                  key={ a.name }
                  errors={ errors[a.name] }
                >
                  <FormLabel
                    htmlFor={ `character-ability-${a.name}-${id}` }
                  >
                    <Tooltip
                      label={ a.desc }
                      placement="top"
                      hasArrow
                    >
                      { a.label }
                    </Tooltip>
                  </FormLabel>
                  <Input
                    id={ `character-ability-${a.name}-${id}` }
                    type="number"
                    onChange={ e => onChange({
                      ...character,
                      abilities: {
                        ...character.abilities,
                        [a.name]: e.target.value
                      }
                    }) }
                    value={ character.abilities[a.name] }
                  />
                </FormControl>
              )
            }) }
          </SimpleGrid>
        </fieldset>
        <fieldset>
          <legend>Skills</legend>
          <SimpleGrid
            columns="3"
            spacing="4"
            alignItems="flex-end"
          >
            { skillList.map(s => {
              return (
                <FormControl
                  key={ s.name }
                  errors={ errors[s.name] }
                >
                  <FormLabel
                    htmlFor={ `character-skill-${s.name}-${id}` }
                  >
                    { s.label }
                  </FormLabel>
                  <Input
                    id={ `character-skill-${s.name}-${id}` }
                    type="number"
                    onChange={ e => onChange({
                      ...character,
                      skills: {
                        ...character.skills,
                        [s.name]: e.target.value
                      }
                    }) }
                    value={ character.skills[s.name] }
                  />
                </FormControl>
              )
            }) }
          </SimpleGrid>
        </fieldset>
        <Button
          onClick={ onDeleteModalOpen }
          isLoading={ deleting }
          colorScheme="red"
        >
          Delete Character
        </Button>
        <AlertDialog
          isOpen={ deleteModalIsOpen }
          leastDestructiveRef={ deleteFormRef }
          header="Delete Character"
          body="Are you sure? You can't undo this action."
          footer={ <>
            <Button
              ref={ deleteFormRef }
              onClick={ onDeleteModalClose }
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={ onCharacterDelete }
              isLoading={ deleting }
              ml="4"
            >
              Delete Character
            </Button>
          </> }
        />
      </VStack>
    </chakra.form>
  )
}
