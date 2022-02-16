import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import routes from '@routes'
import { Navigation } from '@components'
import { actions as currentUserActions } from '@stores/current-user'
import { actions as classesActions } from '@stores/classes'
import { actions as racesActions } from '@stores/races'

export default function App() {
  const dispatch = useDispatch()
  const [ready, setReady] = useState(false)

  // Login with tokens on startup
  useEffect(() => {
    dispatch(currentUserActions.loginUser({}))
      .then(() => {
        setReady(true)
        dispatch(classesActions.getClasses())
        dispatch(racesActions.getRaces())
      })
  }, [dispatch])

  return ready ? (
    <>
      <Navigation />
      <main>
        <Routes>
          { routes.map(route => (
            <Route
              key={ route.name }
              { ...route }
            />
          )) }
        </Routes>
      </main>
    </>
  ) : null
}
