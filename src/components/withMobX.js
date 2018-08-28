import { createNewTaskWithDefaults } from '../models/Task'
import { clamp, isEmpty, prop, times } from 'ramda'
import { findIndexById } from '../lib/ramda-ext'
import { xRemoveAt, xToggleProp } from './xUtils'
import { computed, observable } from 'mobx'

const state = observable.object(
  {
    tasks: times(createNewTaskWithDefaults)(16),
    sIdx: 0,
  },
  {},
  { name: 'state' },
)

const computedFn = fn => computed(fn).get()

export const tasks = () => computedFn(() => state.tasks)
const sIdx = () => computedFn(() => state.sIdx)

const clampedSIdx = () =>
  computedFn(
    () => (isEmpty(tasks()) ? NaN : clamp(0, tasks().length - 1)(sIdx())),
  )
const sTask = () => computedFn(() => tasks()[clampedSIdx()])
export const sId = () => computedFn(() => prop('id')(sTask()))

const setSIdx = idx => (state.sIdx = idx)

export const handleSelectTask = id => () => {
  const idx = findIndexById(id)(tasks())
  return setSIdx(idx)
}
export const handleSelectedTaskToggleDone = () => xToggleProp('done', sTask())
export const handleSelectedTaskDelete = () => xRemoveAt(clampedSIdx(), tasks())
