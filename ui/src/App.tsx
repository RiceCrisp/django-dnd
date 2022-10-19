import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import routes from '~/routes'
import { Navigation } from '~/components'
import { actions as currentUserActions } from '~/stores/current-user'
import { actions as classesActions } from '~/stores/classes'
import { actions as racesActions } from '~/stores/races'
import { useAppDispatch, useAppSelector } from '~/hooks'

export default function App() {
  const dispatch = useAppDispatch()
  const [ready, setReady] = useState(false)
  const { status } = useAppSelector((state) => state.currentUser)

  // Login with tokens on startup
  useEffect(() => {
    dispatch(currentUserActions.loginUser({}))
  }, [dispatch])

  useEffect(() => {
    if (status === 'LOGGED_IN' || status === 'LOGGED_OUT') {
      setReady(true)
      dispatch(classesActions.getClasses())
      dispatch(racesActions.getRaces())
    }
  }, [dispatch, status])

  return ready
    ? (
      <>
        <Navigation />
        <main>
          <Routes>
            { routes.map(({ key, ...route }) => (
              <Route
                key={key}
                { ...route }
              />
            )) }
          </Routes>
        </main>
      </>
    )
    : null
}
