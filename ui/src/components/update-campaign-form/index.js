import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  chakra,
  FormLabel,
  Input
} from '@chakra-ui/react'

import { FormControl } from '@components'
import { actions } from '@stores/campaigns'

export function UpdateCampaignForm({
  campaign,
  onSuccess,
  ...props
}) {
  const [errors, setErrors] = useState({})
  const [name, setName] = useState(campaign.name || '')

  const dispatch = useDispatch()

  const handleUpdateSubmit = async e => {
    e.preventDefault()
    setErrors({})
    try {
      await dispatch(actions.updateCampaign({
        id: campaign.id,
        fields: {
          name: name
        }
      })).unwrap()
      onSuccess()
    }
    catch (err) {
      setErrors(err)
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
          onChange={ e => setName(e.target.value) }
          value={ name }
          required
        />
      </FormControl>
    </chakra.form>
  )
}
