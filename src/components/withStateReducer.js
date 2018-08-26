import { withReducer } from 'recompose'
import { cond, indexOf, propEq, T, times, update } from 'ramda'
import {
  createNewTaskWithDefaults,
  setTaskDone,
} from '../models/Task'
import { findById } from '../models/TaskList'

function reducer(state, action) {
  console.log('state', state)
  console.table(action)
  cond([
    //
    [
      propEq('type', 'task.toggleDone'),
      ({ id }) => {
        const tasks = state.tasks
        const task = findById(id)(tasks)
        const updateTask = update(indexOf(task)(tasks))
        return {
          tasks: updateTask(setTaskDone(!task.done, task))(tasks),
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
  ])
  return state
}

function initialState() {
  return {
    tasks: times(createNewTaskWithDefaults)(8),
  }
}

export function withStateReducer() {
  return withReducer('state', 'dispatch', reducer, initialState())
}
