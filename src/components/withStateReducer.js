import { withReducer } from 'recompose'
import {
  cond,
  indexOf,
  lensIndex,
  over,
  propEq,
  T,
  times,
} from 'ramda'
import {
  createNewTaskWithDefaults,
  setTaskDone,
} from '../models/Task'
import { findById } from '../models/TaskList'

function lensById(id, list) {
  const item = findById(id)(list)
  return lensIndex(indexOf(item)(list))
}

function reducer(state, action) {
  console.log('state', state)
  console.table(action)
  return cond([
    //
    [
      propEq('type', 'task.toggleDone'),
      ({ id }) => {
        const tasks = state.tasks
        const taskLens = lensById(id, tasks)
        return {
          tasks: over(taskLens)(task =>
            setTaskDone(!task.done, task),
          )(tasks),
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
