import { withReducer } from 'recompose'
import { cond, is, propEq, T, times } from 'ramda'
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
  console.groupCollapsed(`[action] ${action.type}`)
  try {
    console.debug(action)
    console.debug('state', state)
    const actionEq = propEq('type')
    const newStateOrFn = cond([
      //
      [
        actionEq('task.toggleDone'),
        ({ id }) => overItemInListWithId(id)(toggleTaskDone)('tasks')(state),
      ],
      conditionInvalidAction,
    ])(action, state)
    if (is(Function)(newStateOrFn)) {
      return newStateOrFn(state)
    }
    return newStateOrFn
  } finally {
    console.groupEnd()
  }
}

function initialState() {
  return {
    tasks: times(createNewTaskWithDefaults)(8),
  }
}

export function withStateReducer() {
  return withReducer('state', 'dispatch', reducer, initialState())
}
