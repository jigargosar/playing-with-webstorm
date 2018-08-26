import { withReducer } from 'recompose'
import { cond, propEq, T, times } from 'ramda'
import {
  createNewTaskWithDefaults,
  toggleTaskDone,
} from '../models/Task'
import { overModelWithId, overProp } from '../lib/ramda-ext'

function reducer(state, action) {
  console.log('state', state)
  console.table(action)
  const actionEq = propEq('type')
  return cond([
    //
    [
      actionEq('task.toggleDone'),
      ({ id }) => {
        const overCollectionModelWithId = id => fn => cName =>
          overProp(cName)(overModelWithId(id)(fn))
        return overCollectionModelWithId(id)(toggleTaskDone)('tasks')(
          state,
        )
      },
    ],
    [
      T,
      action => {
        const message = `Invalid Action ${action.type}`
        console.error(message, action)
        throw new Error(message)
      },
    ],
  ])(action)
}

function initialState() {
  return {
    tasks: times(createNewTaskWithDefaults)(8),
  }
}

export function withStateReducer() {
  return withReducer('state', 'dispatch', reducer, initialState())
}
