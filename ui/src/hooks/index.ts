import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/stores'

export { useAbilities } from './use-abilities'
export { useClasses } from './use-classes'
// export { debounce, useDebounce } from './use-debounce'
export { useRaces } from './use-races'
export { useSkills } from './use-skills'
export { useUser } from './use-user'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
