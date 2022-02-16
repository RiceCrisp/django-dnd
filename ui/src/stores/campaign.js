import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { actions as charactersActions } from '@stores/characters'

import axiosInstance from '@axios'

const initialState = {
  status: 'INIT',
  campaign: null,
  characters: []
}

const thunkActions = {
  getCampaign: createAsyncThunk(
    'campaign/get',
    async (campaignId, thunkAPI) => {
      try {
        const res = await axiosInstance.get(`/campaigns/${campaignId}/`)
        await thunkAPI.dispatch(charactersActions.getCharacters(campaignId))
        return thunkAPI.fulfillWithValue(res.data)
      }
      catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
}

export const slice = createSlice({
  name: 'campaign',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      thunkActions.getCampaign.pending,
      state => {
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
      state => {
        state.status = 'ERROR'
        state.campaign = null
      }
    )
  }
})

export const actions = { ...thunkActions, ...slice.actions }

export const reducers = slice.reducer
