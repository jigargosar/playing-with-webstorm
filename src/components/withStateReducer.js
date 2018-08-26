import { withReducer } from 'recompose'
import { cond, propEq, T, times } from 'ramda'
import {
  createNewTaskWithDefaults,
  setTaskDone,
} from '../models/Task'
import { overItemById } from '../lib/ramda-ext'

function reducer(state, action) {
  console.log('state', state)
  console.table(action)
  return cond([
    //
    [
      propEq('type', 'task.toggleDone'),
      ({ id }) => {
        return {
          tasks: overItemById(
            id,
            task => setTaskDone(!task.done, task),
            state.tasks,
          ),
        }
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
