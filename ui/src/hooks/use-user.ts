import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '~/stores'

export function useUser(callback: (arg: RootState['currentUser']) => void) {
  const loggedInUser = useSelector((state: RootState) => state.currentUser)

  useEffect(() => {
    if (loggedInUser.status === 'LOGGED_IN' || loggedInUser.status === 'LOGGED_OUT') {
      callback(loggedInUser)
    }
  }, [callback, loggedInUser])
}
