import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  chakra,
  FormLabel,
  Input
} from '@chakra-ui/react'

import { FormControl } from '@components'
import { actions as campaignActions } from '@stores/campaigns'

export function CreateCampaignForm({
  onSuccess,
  ...props
}) {
  const [errors, setErrors] = useState({})
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const handleCreateSubmit = async e => {
    e.preventDefault()
    setErrors({})
    try {
      await dispatch(campaignActions.createCampaign({
        name: name
      }))
        .unwrap()
      onSuccess()
    }
    catch (err) {
      setErrors(err)
    }
  }

  return (
    <chakra.form
      onSubmit={ handleCreateSubmit }
      { ...props }
    >
      <FormControl
        isInvalid={ errors.name }
      >
        <FormLabel htmlFor="create-campaign-name">Name</FormLabel>
        <Input
          id="create-campaign-name"
          type="text"
          onChange={ e => setName(e.target.value) }
          value={ name }
          required
        />
      </FormControl>
    </chakra.form>
  )
}
