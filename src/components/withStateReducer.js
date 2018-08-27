import { withReducer } from 'recompose'
import { cond, is, omit, propEq, T, times } from 'ramda'
import { createNewTaskWithDefaults, toggleTaskDone } from '../models/Task'
import { overItemInListWithId } from '../lib/ramda-ext'
import assert from 'power-assert'
import { validate } from '../lib/validate'

const conditionInvalidAction = [
  T,
  action => {
    assert.fail(action, 'Invalid Action')
  },
]

function tasksReducer(state, action) {
  const actionEq = propEq('type')
  const conditions = [
    //
    [
      actionEq('task.toggleDone'),
      ({ id }) => overItemInListWithId(id)(toggleTaskDone)('tasks')(state),
    ],
  ]
  const newStateOrFn = cond([...conditions, conditionInvalidAction])(
    action,
    state,
  )
  return is(Function)(newStateOrFn) ? newStateOrFn(state) : newStateOrFn
}
function wrapReducer(reducer) {
  return function(state, action) {
    validate('OO', [state, action])
    console.groupCollapsed(`[action] ${action.type}`, omit(['type'])(action))
    try {
      console.log(action)
      console.log('state', state)
      return reducer(state, action)
    } finally {
      console.groupEnd()
    }
  }
}

function initialState() {
  return {
    tasks: times(createNewTaskWithDefaults)(8),
  }
}

export function withStateReducer() {
  return withReducer(
    'state',
    'dispatch',
    wrapReducer(tasksReducer),
    initialState(),
  )
}
