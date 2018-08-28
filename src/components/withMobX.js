import { createNewTaskWithDefaults } from '../models/Task'
import { prop, times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { xRemoveAt, xToggleProp } from './xUtils'
import { computed, observable } from 'mobx'

const state = observable.object(
  {
    tasks: times(createNewTaskWithDefaults)(16),
    _sIdx: 0,
  },
  {},
  { name: 'state' },
)

const computedFn = fn => () => computed(fn).get()

export const tasks = computedFn(() => state.tasks)
const sIdx = computedFn(() => state._sIdx)

const clampedSIdx = computedFn(() => clampIdx(sIdx())(tasks()))
const sTask = computedFn(() => tasks()[clampedSIdx()])
export const sId = computedFn(() => prop('id')(sTask()))

const setSIdx = idx => (state._sIdx = idx)

export const handleSelectTask = id => () => {
  const idx = findIndexById(id)(tasks())
  return setSIdx(idx)
}
export const handleSelectedTaskToggleDone = () => xToggleProp('done', sTask())
export const handleSelectedTaskDelete = () => xRemoveAt(clampedSIdx(), tasks())
