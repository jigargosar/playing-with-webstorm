import { injectState, provideState } from 'freactal'
import { initialState } from './simple-state'

export { injectState }

export const wrapComponentWithState = provideState({
  initialState,
})
