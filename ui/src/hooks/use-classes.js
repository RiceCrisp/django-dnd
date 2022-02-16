import { useEffect, useState } from 'react'

import axiosInstance from '@axios'

export function useClasses() {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    axiosInstance.options('/characters/')
      .then(res => {
        setClasses(res.data.actions.POST._class.choices)
      })
  }, [setClasses])

  return classes
}
