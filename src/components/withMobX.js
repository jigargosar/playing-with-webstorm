import * as x from 'mobx'
import * as mobXReact from 'mobx-react'
import { createNewTaskWithDefaults } from '../models/Task'
import { clamp, isEmpty, path, times } from 'ramda'
import { findIndexById, togglePath } from '../lib/ramda-ext'

const xr = mobXReact

export const state = x.observable.object({
  tasks: times(createNewTaskWithDefaults)(16),
  sIdx: 0,

  get clampedSIdx() {
    if (isEmpty(state.tasks)) return NaN
    return clamp(0, state.tasks.length - 1)(state.sIdx)
  },
  get sTask() {
    return state.tasks[state.clampedSIdx]
  },
  get sId() {
    return path(['sTask', 'id'])(state)
  },
})

export const handleSelectTask = id => () =>
  (state.sIdx = findIndexById(id)(state.tasks))

const xTogglePath = (p, obj) => Object.assign(obj, togglePath(p)(obj))

export const handleSelectedTaskToggleDone = () =>
  xTogglePath(['sTask', 'done'])(state)
export const handleSelectedTaskDelete = () =>
  state.tasks.splice(state.clampedSIdx, 1)

export { xr }
