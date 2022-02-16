import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import theme from './theme'

import { reducers as currentUserReducers } from '@stores/current-user'
import { reducers as campaignsReducers } from '@stores/campaigns'
import { reducers as campaignReducers } from '@stores/campaign'
import { reducers as charactersReducers } from '@stores/characters'
import { reducers as classesReducers } from '@stores/classes'
import { reducers as racesReducers } from '@stores/races'

const store = configureStore({
  reducer: {
    currentUser: currentUserReducers,
    campaigns: campaignsReducers,
    campaign: campaignReducers,
    characters: charactersReducers,
    classes: classesReducers,
    races: racesReducers
  }
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <ChakraProvider theme={ theme }>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
