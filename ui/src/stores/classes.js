import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '@axios'

const initialState = {
  status: 'INIT',
  classes: []
}

const thunkActions = {
  getClasses: createAsyncThunk(
    'classes/get',
    async (args, thunkAPI) => {
      try {
        const res = await axiosInstance.options('/characters/')
        return thunkAPI.fulfillWithValue(res.data.actions.POST._class.choices)
      }
      catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
}

export const slice = createSlice({
  name: 'classes',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      thunkActions.getClasses.pending,
      state => {
        state.status = 'PENDING'
      }
    )
    builder.addCase(
      thunkActions.getClasses.fulfilled,
      (state, action) => {
        state.status = 'COMPLETE'
        state.classes = action.payload
      }
    )
    builder.addCase(
      thunkActions.getClasses.rejected,
      state => {
        state.status = 'ERROR'
        state.classes = null
      }
    )
  }
})

export const actions = { ...thunkActions, ...slice.actions }

export const reducers = slice.reducer
