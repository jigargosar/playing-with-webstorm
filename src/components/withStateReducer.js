import { withReducer } from 'recompose'
import { times } from 'ramda'
import { createNewTaskWithDefaults } from '../models/Task'

function reducer(state, action) {
  console.log('state', state)
  console.log('action', action)
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
