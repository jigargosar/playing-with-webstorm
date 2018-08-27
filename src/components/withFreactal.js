import { injectState, provideState } from 'freactal'
import { initialState } from './simple-state'
import { overItemInListWithId } from '../lib/ramda-ext'
import { toggleTaskDone } from '../models/Task'

export { injectState }

export const wrapComponentWithState = provideState({
  initialState,
  effects: {
    toggleTaskDone: (effects, id) =>
      overItemInListWithId(id)(toggleTaskDone)('tasks'),
  },
})
