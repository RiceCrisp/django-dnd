import React, { useEffect, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  chakra,
  Container,
  Heading,
  HStack,
  IconButton,
  Link,
  ListItem,
  Spacer,
  StackDivider,
  UnorderedList,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { MdDelete, MdEdit } from 'react-icons/md'

import {
  AlertDialog,
  Authorized,
  Modal,
  UpdateCampaignForm
} from '@components'
import { actions } from '@stores/campaigns'
import { CreateCampaignForm } from '../components/create-campaign-form'

export const campaigns = {
  path: '/campaigns/',
  key: 'campaigns',
  element: <Element />
}

function Element(props) {
  const dispatch = useDispatch()
  const { campaigns } = useSelector(state => state.campaigns)

  const {
    isOpen: createModalIsOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose
  } = useDisclosure()

  useEffect(() => {
    dispatch(actions.getCampaigns())
  }, [dispatch])

  return (
    <Authorized
      loggedOut="/login/"
    >
      <Container maxW="container.lg">
        <Heading as="h1">Campaigns</Heading>
        <chakra.div
          layerStyle="card"
        >
          <Button
            colorScheme="blue"
            mb="5"
            onClick={ onCreateModalOpen }
          >
            Create new campaign
          </Button>
          <Modal
            isOpen={ createModalIsOpen }
            onClose={ onCreateModalClose }
            header="Create new campaign"
            body={ <>
              <CreateCampaignForm
                id="campaign-create-form"
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
                Create Campaign
              </Button>
            </> }
          />
          <VStack
            as={ UnorderedList }
            styleType="none"
            m="0"
            spacing="4"
            alignItems="flex-start"
            divider={ <StackDivider borderColor="gray.200" /> }
          >
            { campaigns.map(campaign => {
              return (
                <CampaignPreview
                  key={ campaign.id }
                  campaign={ campaign }
                  as={ ListItem }
                  w="full"
                />
              )
            }) }
          </VStack>
        </chakra.div>
      </Container>
    </Authorized>
  )
}

function CampaignPreview({
  campaign,
  ...props
}) {
  const dispatch = useDispatch()

  const deleteFormRef = useRef()

  const {
    isOpen: updateModalIsOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose
  } = useDisclosure()

  const {
    isOpen: deleteModalIsOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose
  } = useDisclosure()

  const handleDeleteSubmit = id => {
    dispatch(actions.deleteCampaign(id))
      .then(() => {
        onDeleteModalClose()
      })
  }

  return (
    <HStack
      key={ campaign.id }
      { ...props }
    >
      <Link
        as={ RouterLink }
        to={ `/campaigns/${campaign.id}/` }
      >
        { campaign.name }
      </Link>
      <Spacer />
      <IconButton
        aria-label="Edit"
        colorScheme="blue"
        variant="outline"
        icon={ <MdEdit /> }
        onClick={ onUpdateModalOpen }
      />
      <Modal
        isOpen={ updateModalIsOpen }
        onClose={ onUpdateModalClose }
        header="Update campaign"
        body={ <>
          <UpdateCampaignForm
            id={ `campaign-update-form-${campaign.id}` }
            campaign={ campaign }
            onSuccess={ () => {
              onUpdateModalClose()
            } }
          />
        </> }
        footer={ <>
          <Button
            colorScheme="blue"
            variant="ghost"
            mr="3"
            onClick={ onUpdateModalClose }
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={ `campaign-update-form-${campaign.id}` }
            colorScheme="blue"
          >
            Save Campaign
          </Button>
        </> }
      />
      <IconButton
        aria-label="Delete"
        colorScheme="red"
        variant="outline"
        icon={ <MdDelete /> }
        onClick={ onDeleteModalOpen }
      />
      <AlertDialog
        isOpen={ deleteModalIsOpen }
        leastDestructiveRef={ deleteFormRef }
        header="Delete Campaign"
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
            onClick={ e => {
              e.preventDefault()
              handleDeleteSubmit(campaign.id)
            } }
            ml="4"
          >
            Delete
          </Button>
        </> }
      />
    </HStack>
  )
}
