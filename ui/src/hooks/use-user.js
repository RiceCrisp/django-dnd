import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function useUser(callback) {
  const loggedInUser = useSelector(state => state.loggedInUser)

  useEffect(() => {
    if (loggedInUser.status === 'LOGGED_IN' || loggedInUser.status === 'LOGGED_OUT') {
      callback(loggedInUser)
    }
  }, [callback, loggedInUser])
}
