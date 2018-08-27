import { injectState, provideState, update } from 'freactal'
import { initialState } from './simple-state'
import {
  findIndexById,
  overItemInListWithId,
  rejectById,
} from '../lib/ramda-ext'
import { toggleTaskDone } from '../models/Task'

export { injectState }

export const withAppState = provideState({
  initialState,
  effects: {
    toggleTaskDone: (effects, id) =>
      overItemInListWithId(id)(toggleTaskDone)('tasks'),
    deleteTask: update((state, id) => ({ tasks: rejectById(id)(state.tasks) })),
    selectTask: update((state, id) => ({
      selectedIndex: findIndexById(id)(state.tasks),
    })),
  },
})
