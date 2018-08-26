import { withReducer } from 'recompose'
import { cond, propEq, T, times } from 'ramda'
import { createNewTaskWithDefaults } from '../models/Task'

function reducer(state, action) {
  console.log('state', state)
  console.table(action)
  cond([
    //
    [propEq('type', 'task.toggleDone'), ({ id }) => {}],
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
