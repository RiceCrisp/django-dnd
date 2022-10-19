import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import axiosInstance from '~/axios'
import { UserAPIResponse, UserState } from '~/types'

const initialState: UserState = {
  status: 'INIT',
  id: '',
  username: '',
  email: '',
  firstName: '',
  lastName: ''
}

const thunkActions = {
  loginUser: createAsyncThunk(
    'currentUser/login',
    async ({ username, password }: { username?: string, password?: string }, thunkAPI) => {
      if (username && password) {
        try {
          const tokens = await axiosInstance.post('/auth/jwt/create/', {
            username,
            password
          })
          axiosInstance.defaults.headers.common.Authorization = `JWT ${tokens.data.access}`
          localStorage.setItem('access_token', tokens.data.access)
          localStorage.setItem('refresh_token', tokens.data.refresh)
          const user = await axiosInstance.get('/auth/users/me/')
          return user.data as UserAPIResponse
        }
        catch (err) {
          const error = err as AxiosError
          return thunkAPI.rejectWithValue(error.response?.data)
        }
      }
      else {
        try {
          const user = await axiosInstance.get('/auth/users/me/')
          return user.data as UserAPIResponse
        }
        catch (err) {
          const error = err as AxiosError
          return thunkAPI.rejectWithValue(error.response?.data)
        }
      }
    }
  ),
  updateUser: createAsyncThunk(
    'currentUser/update',
    async ({ firstName, lastName }: { firstName?: string, lastName?: string }, thunkAPI) => {
      try {
        const res = await axiosInstance.patch('/auth/users/me/', {
          first_name: firstName,
          last_name: lastName
        })
        return res.data as UserAPIResponse
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  ),
  logoutUser: createAsyncThunk(
    'currentUser/logout',
    async (arg, thunkAPI) => {
      try {
        const res = await axiosInstance.post('/auth/jwt/destroy/', {
          refresh_token: localStorage.getItem('refresh_token')
        })
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        axiosInstance.defaults.headers.common.Authorization = ''
        return thunkAPI.fulfillWithValue(res.data)
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  )
}

export const slice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      thunkActions.loginUser.pending,
      (state) => {
        state.status = 'PENDING'
      }
    )
    builder.addCase(
      thunkActions.loginUser.fulfilled,
      (state, action) => {
        state.status = 'LOGGED_IN'
        state.id = action.payload.id
        state.username = action.payload.username
        state.email = action.payload.email
        state.firstName = action.payload.first_name || ''
        state.lastName = action.payload.last_name || ''
      }
    )
    builder.addCase(
      thunkActions.loginUser.rejected,
      () => {
        return {
          ...initialState,
          status: 'LOGGED_OUT'
        }
      }
    )
    builder.addCase(
      thunkActions.logoutUser.fulfilled,
      () => {
        return {
          ...initialState,
          status: 'LOGGED_OUT'
        }
      }
    )
    builder.addCase(
      thunkActions.updateUser.fulfilled,
      (state, action) => {
        state.status = 'LOGGED_IN'
        state.id = action.payload.id
        state.username = action.payload.username
        state.email = action.payload.email
        state.firstName = action.payload.first_name || ''
        state.lastName = action.payload.last_name || ''
      }
    )
  }
})

export const actions = { ...thunkActions, ...slice.actions }

export const reducers = slice.reducer
