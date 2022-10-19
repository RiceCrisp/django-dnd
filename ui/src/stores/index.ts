import { configureStore } from '@reduxjs/toolkit'

import { reducers as campaignReducers } from './campaign'
import { reducers as campaignsReducers } from './campaigns'
import { reducers as charactersReducers } from './characters'
import { reducers as classesReducers } from './classes'
import { reducers as currentUserReducers } from './current-user'
import { reducers as racesReducers } from './races'

export const store = configureStore({
  reducer: {
    campaign: campaignReducers,
    campaigns: campaignsReducers,
    characters: charactersReducers,
    classes: classesReducers,
    currentUser: currentUserReducers,
    races: racesReducers
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
