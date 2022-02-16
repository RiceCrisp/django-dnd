import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function Authorized({
  loggedIn,
  loggedOut,
  children
}) {
  const [output, setOutput] = useState(null)

  const currentUser = useSelector(state => state.currentUser)

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser.status === 'LOGGED_IN') {
      if (loggedIn) {
        navigate(loggedIn)
      }
      setOutput(children)
    }
    else if (currentUser.status === 'LOGGED_OUT') {
      if (loggedOut) {
        navigate(loggedOut)
      }
      setOutput(children)
    }
  }, [children, navigate, loggedIn, loggedOut, currentUser, currentUser.status])

  return output
}
