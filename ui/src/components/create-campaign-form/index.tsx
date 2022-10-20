import React, { useState } from 'react'
import {
  chakra,
  FormLabel,
  Input
} from '@chakra-ui/react'

import { FormControl } from '~/components'
import { actions as campaignActions } from '~/stores/campaigns'
import { useAppDispatch } from '~/hooks'

export interface CreateCampaignFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onSuccess: () => void
}

export function CreateCampaignForm({
  onSuccess,
  ...props
}: CreateCampaignFormProps) {
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [name, setName] = useState('')

  const dispatch = useAppDispatch()

  const handleCreateSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault()
    setErrors({})
    try {
      await dispatch(campaignActions.createCampaign({
        name
      }))
      onSuccess()
    }
    catch (err) {
      const error = err as Record<string, string[]>
      setErrors(error)
    }
  }

  return (
    <chakra.form
      onSubmit={ handleCreateSubmit }
      { ...props }
    >
      <FormControl
        errors={ errors.name }
      >
        <FormLabel htmlFor="create-campaign-name">Name</FormLabel>
        <Input
          id="create-campaign-name"
          type="text"
          onChange={ (e) => setName(e.target.value) }
          value={ name }
          required
        />
      </FormControl>
    </chakra.form>
  )
}
