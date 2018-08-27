import { injectState, provideState, update } from 'freactal'
import { initialState } from './simple-state'
import { overItemInListWithId, rejectById } from '../lib/ramda-ext'
import { toggleTaskDone } from '../models/Task'

export { injectState }

export const withAppState = provideState({
  initialState,
  effects: {
    toggleTaskDone: (effects, id) =>
      overItemInListWithId(id)(toggleTaskDone)('tasks'),
    deleteTask: update((state, id) => ({
      tasks: rejectById(id)(state.tasks),
    })),
    // selectTask: update((state, id) => ({
    //   selectedIndex: findIndexById(id)(state.tasks),
    // })),
  },
})

export const withIndexState = (indexName = 'index') =>
  provideState({
    initialState: () => ({ [indexName]: 1 }),
    effects: {
      setIndex: update((state, index) => ({ [indexName]: index })),
    },
  })
