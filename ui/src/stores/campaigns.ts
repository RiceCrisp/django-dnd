import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import axiosInstance from '~/axios'
import { TCampaign, CampaignsState } from '~/types'

const initialState: CampaignsState = {
  status: 'INIT',
  campaigns: []
}

const thunkActions = {
  getCampaigns: createAsyncThunk(
    'campaigns/get',
    async (arg, thunkAPI) => {
      try {
        const res = await axiosInstance.get('/campaigns/')
        return res.data as TCampaign[]
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  ),
  createCampaign: createAsyncThunk(
    'campaigns/create',
    async ({ name }: { name: TCampaign['name'] }, thunkAPI) => {
      try {
        const res = await axiosInstance.post(
          '/campaigns/',
          {
            name
          }
        )
        return res.data as TCampaign
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  ),
  updateCampaign: createAsyncThunk(
    'campaigns/update',
    async ({ id, fields }: { id: TCampaign['id'], fields: Omit<TCampaign, 'id'> }, thunkAPI) => {
      try {
        const res = await axiosInstance.patch(
          `/campaigns/${id}/`,
          fields
        )
        return res.data as TCampaign
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  ),
  deleteCampaign: createAsyncThunk(
    'campaigns/delete',
    async (id: TCampaign['id'], thunkAPI) => {
      try {
        await axiosInstance.delete(`/campaigns/${id}/`)
        return id
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  )
}

export const slice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      thunkActions.getCampaigns.pending,
      (state) => {
        state.status = 'PENDING'
      }
    )
    builder.addCase(
      thunkActions.getCampaigns.fulfilled,
      (state, action) => {
        state.status = 'COMPLETE'
        state.campaigns = action.payload
      }
    )
    builder.addCase(
      thunkActions.getCampaigns.rejected,
      (state) => {
        state.status = 'ERROR'
        state.campaigns = []
      }
    )
    builder.addCase(
      thunkActions.createCampaign.pending,
      (state) => {
        state.status = 'PENDING'
      }
    )
    builder.addCase(
      thunkActions.createCampaign.fulfilled,
      (state, action) => {
        state.status = 'COMPLETE'
        state.campaigns.push(action.payload)
      }
    )
    builder.addCase(
      thunkActions.createCampaign.rejected,
      (state) => {
        state.status = 'ERROR'
      }
    )
    builder.addCase(
      thunkActions.updateCampaign.pending,
      (state) => {
        state.status = 'PENDING'
      }
    )
    builder.addCase(
      thunkActions.updateCampaign.fulfilled,
      (state, action) => {
        state.status = 'COMPLETE'
        const updateIndex = state.campaigns.findIndex((c) => c.id === action.payload.id)
        state.campaigns[updateIndex] = action.payload
      }
    )
    builder.addCase(
      thunkActions.updateCampaign.rejected,
      (state) => {
        state.status = 'ERROR'
      }
    )
    builder.addCase(
      thunkActions.deleteCampaign.pending,
      (state) => {
        state.status = 'PENDING'
      }
    )
    builder.addCase(
      thunkActions.deleteCampaign.fulfilled,
      (state, action) => {
        state.status = 'COMPLETE'
        state.campaigns = state.campaigns.filter((c) => c.id !== action.payload)
      }
    )
    builder.addCase(
      thunkActions.deleteCampaign.rejected,
      (state) => {
        state.status = 'ERROR'
      }
    )
  }
})

export const actions = { ...thunkActions, ...slice.actions }

export const reducers = slice.reducer
