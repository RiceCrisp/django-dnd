import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '~/stores'

export interface AuthorizedProps {
  loggedIn?: string
  loggedOut?: string
  children: React.ReactNode
}

export function Authorized({
  loggedIn,
  loggedOut,
  children
}: AuthorizedProps) {
  const [output, setOutput] = useState<JSX.Element | null>(null)

  const currentUser = useSelector((state: RootState) => state.currentUser)

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser.status === 'LOGGED_IN') {
      if (loggedIn) {
        navigate(loggedIn)
      }
      setOutput(
        <>
          { children }
        </>
      )
    }
    else if (currentUser.status === 'LOGGED_OUT') {
      if (loggedOut) {
        navigate(loggedOut)
      }
      setOutput(
        <>
          { children }
        </>
      )
    }
  }, [children, navigate, loggedIn, loggedOut, currentUser, currentUser.status])

  return output
}
