import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from '@axios'

const initialState = {
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
    async ({ username, password }, thunkAPI) => {
      if (username && password) {
        try {
          const tokens = await axiosInstance.post('/auth/jwt/create/', {
            username: username,
            password: password
          })
          axiosInstance.defaults.headers.Authorization = `JWT ${tokens.data.access}`
          localStorage.setItem('access_token', tokens.data.access)
          localStorage.setItem('refresh_token', tokens.data.refresh)
          const user = await axiosInstance.get('/auth/users/me/')
          return thunkAPI.fulfillWithValue(user.data)
        }
        catch (err) {
          return thunkAPI.rejectWithValue(err.response.data)
        }
      }
      else {
        try {
          const user = await axiosInstance.get('/auth/users/me/')
          return thunkAPI.fulfillWithValue(user.data)
        }
        catch (err) {
          return thunkAPI.rejectWithValue(err.response.data)
        }
      }
    }
  ),
  updateUser: createAsyncThunk(
    'currentUser/update',
    async ({ firstName, lastName }, thunkAPI) => {
      try {
        const res = await axiosInstance.patch('/auth/users/me/', {
          first_name: firstName,
          last_name: lastName
        })
        return thunkAPI.fulfillWithValue(res.data)
      }
      catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
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
        axiosInstance.defaults.headers.Authorization = null
        return thunkAPI.fulfillWithValue(res.data)
      }
      catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
}

export const slice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      thunkActions.loginUser.pending,
      state => {
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
