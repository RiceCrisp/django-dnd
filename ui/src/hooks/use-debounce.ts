// import { useCallback, useRef } from 'react'

// export function debounce(func: () => any, wait: number) {
//   let timer: NodeJS.Timeout
//   return (...args: any) => {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, wait)
//   }
// }

// export function useDebounce(func: () => any, wait: number) {
//   const timeout = useRef<NodeJS.Timeout>()

//   return useCallback(
//     (...args) => {
//       const later = () => {
//         clearTimeout(timeout.current)
//         func(...args)
//       }

//       clearTimeout(timeout.current)
//       timeout.current = setTimeout(later, wait)
//     },
//     [func, wait]
//   )
// }
