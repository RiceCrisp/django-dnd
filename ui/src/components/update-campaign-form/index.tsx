import React, { useState } from 'react'
import {
  chakra,
  FormLabel,
  Input
} from '@chakra-ui/react'

import { FormControl } from '~/components'
import { actions } from '~/stores/campaigns'
import { TCampaign } from '~/types'
import { useAppDispatch } from '~/hooks'

export interface UpdateCampaignFormProps extends React.HTMLAttributes<HTMLFormElement> {
  campaign: TCampaign
  onSuccess: () => void
}

export function UpdateCampaignForm({
  campaign,
  onSuccess,
  ...props
}: UpdateCampaignFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [name, setName] = useState(campaign.name || '')

  const dispatch = useAppDispatch()

  const handleUpdateSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault()
    setErrors({})
    try {
      await dispatch(actions.updateCampaign({
        id: campaign.id,
        fields: {
          name
        }
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
      onSubmit={ handleUpdateSubmit }
      { ...props }
    >
      <FormControl errors={ errors.name }>
        <FormLabel htmlFor="update-campaign-name">Name</FormLabel>
        <Input
          id="update-campaign-name"
          type="text"
          onChange={ (e) => setName(e.target.value) }
          value={ name }
          required
        />
      </FormControl>
    </chakra.form>
  )
}
