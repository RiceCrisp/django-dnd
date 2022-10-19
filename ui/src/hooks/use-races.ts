import { useEffect, useState } from 'react'

import axiosInstance from '~/axios'

export function useRaces() {
  const [races, setRaces] = useState([])

  useEffect(() => {
    axiosInstance.options('/characters/')
      .then((res) => {
        setRaces(res.data.actions.POST.race.choices)
      })
  }, [setRaces])

  return races
}
