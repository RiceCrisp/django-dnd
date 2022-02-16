import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { debounce } from 'lodash'

import axiosInstance from '@axios'

const initialState = {
  status: 'INIT',
  characters: [],
  characterFocusId: 0,
  updateStack: {}
}

const updateDBCharacter = createAsyncThunk(
  'characters/dbupdate',
  async (args, thunkAPI) => {
    const { updateStack } = thunkAPI.getState().characters
    const promises = []
    try {
      for (const id in updateStack) {
        promises.push(axiosInstance.patch(
          `/characters/${id}/`,
          updateStack[id]
        ))
      }
      const res = await Promise.all(promises)
      return thunkAPI.fulfillWithValue(res.data)
    }
    catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

const thunkActions = {
  getCharacters: createAsyncThunk(
    'characters/get',
    async (campaignId, thunkAPI) => {
      try {
        const res = await axiosInstance.get(`/characters/?campaign=${campaignId}`)
        return thunkAPI.fulfillWithValue(res.data)
      }
      catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  ),
  createCharacter: createAsyncThunk(
    'characters/create',
    async (fields, thunkAPI) => {
      try {
        const res = await axiosInstance.post(
          '/characters/',
          fields
        )
        return thunkAPI.fulfillWithValue(res.data)
      }
      catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  ),
  updateCharacter: createAsyncThunk(
    'characters/update',
    debounce(async (args, thunkAPI) => {
      try {
        const res = await thunkAPI.dispatch(updateDBCharacter())
        return thunkAPI.fulfillWithValue(res.data)
      }
      catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }, 1000)
  ),
  deleteCharacter: createAsyncThunk(
    'characters/delete',
    async (id, thunkAPI) => {
      try {
        await axiosInstance.delete(`/characters/${id}/`)
        return thunkAPI.fulfillWithValue(id)
      }
      catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  )
}

export const slice = createSlice({
  name: 'characters',
  initialState: initialState,
  reducers: {
    setCharacterFocus: (state, action) => {
      state.characterFocusId = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(
      thunkActions.getCharacters.fulfilled,
      (state, action) => {
        state.characters = action.payload
      }
    )
    builder.addCase(
      thunkActions.createCharacter.fulfilled,
      (state, action) => {
        state.characters.push(action.payload)
      }
    )
    builder.addCase(
      thunkActions.updateCharacter.pending,
      (state, action) => {
        state.status = 'PENDING'
        const { id, fields } = action.meta.arg
        const updateIndex = state.characters.findIndex(c => c.id === id)
        state.characters[updateIndex] = {
          id: id,
          ...fields
        }
        state.updateStack[id] = fields
      }
    )
    builder.addCase(
      thunkActions.updateCharacter.fulfilled,
      (state, action) => {
        state.status = 'PENDING'
      }
    )
    builder.addCase(
      updateDBCharacter.fulfilled,
      state => {
        state.updateStack = {}
      }
    )
    builder.addCase(
      thunkActions.deleteCharacter.fulfilled,
      (state, action) => {
        state.characters = state.characters.filter(c => c.id !== action.payload)
      }
    )
    builder.addMatcher(
      action => action.type.startsWith('characters/') && action.type.endsWith('/pending'),
      state => {
        state.status = 'PENDING'
      }
    )
    builder.addMatcher(
      action => action.type.startsWith('characters/') && action.type.endsWith('/fulfilled') && action.type !== 'characters/update/fulfilled',
      state => {
        state.status = 'COMPLETE'
      }
    )
    builder.addMatcher(
      action => action.type.startsWith('characters/') && action.type.endsWith('/rejected'),
      state => {
        state.status = 'ERROR'
      }
    )
  }
})

export const actions = { ...thunkActions, ...slice.actions }

export const reducers = slice.reducer
