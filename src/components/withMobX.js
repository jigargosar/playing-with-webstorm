import * as x from 'mobx'
import { createNewTaskWithDefaults } from '../models/Task'
import { clamp, isEmpty, times } from 'ramda'
import { findIndexById } from '../lib/ramda-ext'

export const state = x.observable.object({
  tasks: times(createNewTaskWithDefaults)(16),
  sIdx: 0,

  get clampedSIdx() {
    if (isEmpty(state.tasks)) return NaN
    return clamp(0, state.tasks.length - 1)(state.sIdx)
  },
  get selectedTask() {
    return state.tasks[state.clampedSIdx]
  },
})

export const handleSelectTask = id => () => {
  state.sIdx = findIndexById(id)(state.tasks)
}
export const handleSelectedTaskToggleDone = () => {
  const task = state.selectedTask
  task.done = !task.done
}
export const handleSelectedTaskDelete = id => () => {
  state.tasks.splice(state.clampedSIdx, 1)
}
