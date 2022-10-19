import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { debounce } from 'lodash'

import axiosInstance from '~/axios'
import { TCampaign, TCharacter, CharactersState } from '~/types'
import { RootState } from '~/stores'

const initialState: CharactersState = {
  status: 'INIT',
  characters: [],
  characterFocusId: '',
  updateStack: {}
}

const updateDBCharacter = createAsyncThunk<
void,
void,
{
  state: RootState
}
>(
  'characters/dbupdate',
  async (_args, thunkAPI) => {
    const { updateStack } = thunkAPI.getState().characters
    const promises = []
    try {
      for (const id in updateStack) {
        promises.push(axiosInstance.patch(
          `/characters/${id}/`,
          updateStack[id]
        ))
      }
      await Promise.all(promises)
      return
    }
    catch (err) {
      const error = err as AxiosError
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

const thunkActions = {
  getCharacters: createAsyncThunk(
    'characters/get',
    async (campaignId: TCampaign['id'], thunkAPI) => {
      try {
        const res = await axiosInstance.get(`/characters/?campaign=${campaignId}`)
        return res.data as TCharacter[]
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  ),
  createCharacter: createAsyncThunk(
    'characters/create',
    async (fields: Partial<TCharacter>, thunkAPI) => {
      try {
        const res = await axiosInstance.post(
          '/characters/',
          fields
        )
        return res.data as TCharacter
      }
      catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
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
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }, 1000)
  ),
  deleteCharacter: createAsyncThunk(
    'characters/delete',
    async (id: TCharacter['id'], thunkAPI) => {
      try {
        await axiosInstance.delete(`/characters/${id}/`)
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
  name: 'characters',
  initialState,
  reducers: {
    setCharacterFocus: (state, action) => {
      state.characterFocusId = action.payload
    }
  },
  extraReducers: (builder) => {
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
        const updateIndex = state.characters.findIndex((c) => c.id === id)
        state.characters[updateIndex] = {
          id,
          ...fields
        }
        state.updateStack[id] = fields
      }
    )
    builder.addCase(
      thunkActions.updateCharacter.fulfilled,
      (state) => {
        state.status = 'PENDING'
      }
    )
    builder.addCase(
      updateDBCharacter.fulfilled,
      (state) => {
        state.updateStack = {}
      }
    )
    builder.addCase(
      thunkActions.deleteCharacter.fulfilled,
      (state, action) => {
        state.characters = state.characters.filter((c) => c.id !== action.payload)
      }
    )
    builder.addMatcher(
      (action) => action.type.startsWith('characters/') && action.type.endsWith('/pending'),
      (state) => {
        state.status = 'PENDING'
      }
    )
    builder.addMatcher(
      (action) => action.type.startsWith('characters/') && action.type.endsWith('/fulfilled') && action.type !== 'characters/update/fulfilled',
      (state) => {
        state.status = 'COMPLETE'
      }
    )
    builder.addMatcher(
      (action) => action.type.startsWith('characters/') && action.type.endsWith('/rejected'),
      (state) => {
        state.status = 'ERROR'
      }
    )
  }
})

export const actions = { ...thunkActions, ...slice.actions }

export const reducers = slice.reducer
