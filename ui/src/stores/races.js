import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '@axios'

const initialState = {
  status: 'INIT',
  classes: []
}

const thunkActions = {
  getRaces: createAsyncThunk(
    'races/get',
    async (args, thunkAPI) => {
      try {
        const res = await axiosInstance.options('/characters/')
        return thunkAPI.fulfillWithValue(res.data.actions.POST.race.choices)
      }
      catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
}

export const slice = createSlice({
  name: 'races',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      thunkActions.getRaces.pending,
      state => {
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
      state => {
        state.status = 'ERROR'
        state.races = null
      }
    )
  }
})

export const actions = { ...thunkActions, ...slice.actions }

export const reducers = slice.reducer
