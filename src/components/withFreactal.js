import { provideState } from 'freactal'
import { initialState } from './simple-state'

export const wrapComponentWithState = provideState({
  initialState,
})
