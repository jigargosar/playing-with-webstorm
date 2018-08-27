import * as x from 'mobx'
import * as mobXReact from 'mobx-react'
import { createNewTaskWithDefaults } from '../models/Task'
import { clamp, isEmpty, path, prop, times } from 'ramda'
import { findIndexById } from '../lib/ramda-ext'
import { xRemoveAt, xToggleProp } from './xUtils'

const xr = mobXReact
export { xr }

export const state = x.observable.object(
  {
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
  },
  {},
  { name: 'state' },
)

const tasks = () => x.computed(() => state.tasks).get()
const sTask = () => x.computed(() => state.tasks[state.clampedSIdx]).get()
export const sId = () => x.computed(() => prop('id')(sTask)).get()

const setSIdx = idx => (state.sIdx = idx)

export const handleSelectTask = id => () => setSIdx(findIndexById(id)(tasks()))
export const handleSelectedTaskToggleDone = () => xToggleProp('done', sTask())
export const handleSelectedTaskDelete = () =>
  xRemoveAt(state.clampedSIdx, tasks())
