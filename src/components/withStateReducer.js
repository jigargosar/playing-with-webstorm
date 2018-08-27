import { withReducer } from 'recompose'
import { cond, propEq, T, times } from 'ramda'
import { createNewTaskWithDefaults, toggleTaskDone } from '../models/Task'
import { overItemInListWithId } from '../lib/ramda-ext'
import assert from 'power-assert'

const conditionInvalidAction = [
  T,
  action => {
    assert.fail(action, 'Invalid Action')
  },
]

function reducer(state, action) {
  console.log('state', state)
  console.table(action)
  const actionEq = propEq('type')
  return cond([
    //
    [
      actionEq('task.toggleDone'),
      ({ id }) => overItemInListWithId(id)(toggleTaskDone)('tasks')(state),
    ],
    conditionInvalidAction,
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
