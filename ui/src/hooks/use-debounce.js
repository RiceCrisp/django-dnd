import { useCallback, useRef } from 'react'

export function debounce(func, wait) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export function useDebounce(func, wait) {
  const timeout = useRef()

  return useCallback(
    (...args) => {
      const later = () => {
        clearTimeout(timeout.current)
        func(...args)
      }

      clearTimeout(timeout.current)
      timeout.current = setTimeout(later, wait)
    },
    [func, wait]
  )
}
