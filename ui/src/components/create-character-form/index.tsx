import React, { useState } from 'react'
import {
  chakra,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Tooltip,
  VStack
} from '@chakra-ui/react'

import { FormControl } from '~/components'
import { actions as characterActions } from '~/stores/characters'
import { useAbilities, useAppDispatch, useAppSelector, useSkills } from '~/hooks'
import { TCampaign, TCharacter } from '~/types'

export interface CreateCharacterFormProps extends React.HTMLAttributes<HTMLFormElement> {
  campaignId: TCampaign['id']
  onSuccess: () => void
}

export function CreateCharacterForm({
  campaignId,
  onSuccess,
  ...props
}: CreateCharacterFormProps) {
  const { abilities, abilityList } = useAbilities()
  const { skills, skillList } = useSkills()

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [character, setCharacter] = useState({
    name: '',
    _class: '',
    race: '',
    abilities,
    skills
  })

  const dispatch = useAppDispatch()

  const classes = useAppSelector((state) => state.classes.classes)
  const races = useAppSelector((state) => state.races.races)
  const { characters } = useAppSelector((state) => state.characters)

  const handleCreateSubmit = async (character: Omit<TCharacter, 'id' | 'hp' | 'maxHp'>) => {
    setErrors({})
    try {
      const lastOrder = characters.map((c) => c.order).reduce((previous, current) => {
        return Math.max(previous || 0, current || 0)
      }, -1)
      await dispatch(characterActions.createCharacter({
        campaign: campaignId,
        order: Number(lastOrder) + 1,
        ...character
      }))
      onSuccess()
    }
    catch (err) {
      const error = err as Record<string, string>
      setErrors(error)
    }
  }

  return (
    <chakra.form
      onSubmit={ (e) => {
        e.preventDefault()
        handleCreateSubmit(character)
      } }
      { ...props }
    >
      <VStack spacing="5">
        <FormControl
          errors={ errors.name }
        >
          <FormLabel htmlFor="create-character-name">Name</FormLabel>
          <Input
            id="create-character-name"
            type="text"
            onChange={ (e) => setCharacter({ ...character, name: e.target.value }) }
            value={ character.name }
            required
          />
        </FormControl>
        <FormControl
          errors={ errors.race }
        >
          <FormLabel htmlFor="create-character-race">Race</FormLabel>
          <Select
            id="create-character-race"
            onChange={ (e) => setCharacter({ ...character, race: e.target.value }) }
            value={ character.race }
          >
            { races.map((r) => {
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
          <FormLabel htmlFor="create-character-class">Class</FormLabel>
          <Select
            id="create-character-class"
            onChange={ (e) => setCharacter({ ...character, _class: e.target.value }) }
            value={ character._class }
          >
            { classes.map((c) => {
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
            columns={ 3 }
            spacing="4"
            alignItems="flex-end"
          >
            { abilityList.map((a) => {
              return (
                <FormControl
                  key={ a.name }
                  errors={ errors[a.name] }
                >
                  <FormLabel
                    htmlFor={ `create-character-ability-${a.name}` }
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
                    id={ `create-character-ability-${a.name}` }
                    type="number"
                    onChange={ (e) => setCharacter({
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
            columns={ 3 }
            spacing="4"
            alignItems="flex-end"
          >
            { skillList.map((s) => {
              return (
                <FormControl
                  key={ s.name }
                  errors={ errors[s.name] }
                >
                  <FormLabel
                    htmlFor={ `create-character-skill-${s.name}` }
                  >
                    { s.label }
                  </FormLabel>
                  <Input
                    id={ `create-character-skill-${s.name}` }
                    type="number"
                    onChange={ (e) => setCharacter({
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
      </VStack>
    </chakra.form>
  )
}
