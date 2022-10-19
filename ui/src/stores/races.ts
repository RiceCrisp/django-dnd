import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import axiosInstance from '~/axios'
import { TRace, RacesState } from '~/types'

const initialState: RacesState = {
  status: 'INIT',
  races: []
}

const thunkActions = {
  getRaces: createAsyncThunk(
    'races/get',
    async (args, thunkAPI) => {
      try {
        const res = await axiosInstance.options('/characters/')
        return res.data.actions.POST.race.choices as TRace[]
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  )
}

export const slice = createSlice({
  name: 'races',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      thunkActions.getRaces.pending,
      (state) => {
        state.status = 'PENDING'
      }
    )
    builder.addCase(
      thunkActions.getRaces.fulfilled,
      (state, action) => {
        state.status = 'COMPLETE'
        state.races = action.payload
      }
    )
    builder.addCase(
      thunkActions.getRaces.rejected,
      (state) => {
        state.status = 'ERROR'
        state.races = []
      }
    )
  }
})

export const actions = { ...thunkActions, ...slice.actions }

export const reducers = slice.reducer
