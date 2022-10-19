import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import axiosInstance from '~/axios'
import { actions as charactersActions } from '~/stores/characters'
import { TCampaign, CampaignState } from '~/types'

const initialState: CampaignState = {
  status: 'INIT',
  campaign: null,
  characters: []
}

const thunkActions = {
  getCampaign: createAsyncThunk(
    'campaign/get',
    async (campaignId: string, thunkAPI) => {
      try {
        const res = await axiosInstance.get(`/campaigns/${campaignId}/`)
        await thunkAPI.dispatch(charactersActions.getCharacters(campaignId))
        return res.data as TCampaign
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  )
}

export const slice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      thunkActions.getCampaign.pending,
      (state) => {
        state.status = 'PENDING'
      }
    )
    builder.addCase(
      thunkActions.getCampaign.fulfilled,
      (state, action) => {
        state.status = 'COMPLETE'
        state.campaign = action.payload
      }
    )
    builder.addCase(
      thunkActions.getCampaign.rejected,
      (state) => {
        state.status = 'ERROR'
        state.campaign = null
      }
    )
  }
})

export const actions = { ...thunkActions, ...slice.actions }

export const reducers = slice.reducer
