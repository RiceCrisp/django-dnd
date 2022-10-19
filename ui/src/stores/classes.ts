import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import axiosInstance from '~/axios'
import { TClass, ClassesState } from '~/types'

const initialState: ClassesState = {
  status: 'INIT',
  classes: []
}

const thunkActions = {
  getClasses: createAsyncThunk(
    'classes/get',
    async (args, thunkAPI) => {
      try {
        const res = await axiosInstance.options('/characters/')
        return res.data.actions.POST._class.choices as TClass[]
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  )
}

export const slice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      thunkActions.getClasses.pending,
      (state) => {
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
      (state) => {
        state.status = 'ERROR'
        state.classes = []
      }
    )
  }
})

export const actions = { ...thunkActions, ...slice.actions }

export const reducers = slice.reducer
