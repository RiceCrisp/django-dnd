import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  useDisclosure
} from '@chakra-ui/react'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import {
  Authorized,
  Character,
  CharacterPreview,
  CreateCharacterForm,
  Modal,
  NavigationStatus
} from '~/components'
import { actions as campaignActions } from '~/stores/campaign'
import { actions as charactersActions } from '~/stores/characters'
import { TCharacter } from '~/types'
import { useAppDispatch, useAppSelector } from '~/hooks'

export const campaign = {
  path: '/campaigns/:id/',
  key: 'campaign',
  element: <Element />
}

function Element() {
  const { id: campaignId = '' } = useParams()

  const dispatch = useAppDispatch()
  const [characterFocus, setCharacterFocus] = useState<TCharacter | null>(null)
  const { status: campaignStatus, campaign } = useAppSelector((state) => state.campaign)
  const { status: characterStatus, characters, characterFocusId } = useAppSelector((state) => state.characters)

  const {
    isOpen: createModalIsOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose
  } = useDisclosure()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  useEffect(() => {
    const c = characters.find((c) => c.id === characterFocusId)
    setCharacterFocus(c || null)
  }, [characters, characterFocusId])

  useEffect(() => {
    dispatch(campaignActions.getCampaign(campaignId))
    dispatch(charactersActions.getCharacters(campaignId))
  }, [dispatch, campaignId])

  const onCharacterChange = (character: TCharacter) => {
    const { id, ...fields } = character
    dispatch(charactersActions.updateCharacter({
      id,
      fields
    }))
  }

  const sortedCharacters = [...characters].sort((a, b) => (a.order || 0) - (b.order || 0))

  const navigationStatus = () => {
    if (campaignStatus === 'PENDING' || characterStatus === 'PENDING') {
      return 'Saving...'
    }
    if (campaignStatus === 'COMPLETE' && characterStatus === 'COMPLETE') {
      return 'Saved'
    }
    if (campaignStatus === 'ERROR' || characterStatus === 'ERROR') {
      return 'Error'
    }
    return ''
  }

  return (
    <Authorized
      loggedOut="/login/"
    >
      <NavigationStatus
        status={ navigationStatus() }
      />
      <Container maxW="container.lg">
        <Skeleton isLoaded={ campaignStatus === 'COMPLETE' }>
          <Heading
            as="h1"
            mb="5"
          >
            Campaign: { campaign?.name }
          </Heading>
          <Grid
            templateColumns="40% 60%"
            gap="4"
          >
            <GridItem>
              <DndContext
                sensors={ sensors }
                collisionDetection={ closestCenter }
                onDragEnd={ (e) => {
                  const { active, over } = e
                  if (active.id !== over?.id) {
                    const oldIndex = sortedCharacters.findIndex((c) => c.id === active.id)
                    const newIndex = sortedCharacters.findIndex((c) => c.id === over?.id)
                    onCharacterChange({ ...sortedCharacters[oldIndex], order: newIndex })
                    onCharacterChange({ ...sortedCharacters[newIndex], order: oldIndex })
                  }
                } }
              >
                <SortableContext
                  items={ characters }
                  strategy={ verticalListSortingStrategy }
                >
                  <Grid gap={ 4 }>
                    { sortedCharacters.map((character) => {
                      return (
                        <CharacterPreview
                          key={ character.id }
                          onChange={ onCharacterChange }
                          value={ character }
                        />
                      )
                    }) }
                  </Grid>
                </SortableContext>
              </DndContext>
              <Button
                colorScheme="blue"
                onClick={ onCreateModalOpen }
                my="4"
              >
                Add Character
              </Button>
              <Modal
                isOpen={ createModalIsOpen }
                onClose={ onCreateModalClose }
                header="Add new character"
                size="xl"
                body={ <>
                  <CreateCharacterForm
                    id="campaign-create-form"
                    campaignId={ campaignId }
                    onSuccess={ () => {
                      onCreateModalClose()
                    } }
                  />
                </> }
                footer={ <>
                  <Button
                    colorScheme="blue"
                    variant="ghost"
                    mr="3"
                    onClick={ onCreateModalClose }
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="campaign-create-form"
                    colorScheme="blue"
                  >
                    Create Character
                  </Button>
                </> }
              />
            </GridItem>
            <GridItem>
              { !!characterFocus && (
                <Character
                  onChange={ onCharacterChange }
                  value={ characterFocus }
                />
              ) }
            </GridItem>
          </Grid>
        </Skeleton>
      </Container>
    </Authorized>
  )
}
