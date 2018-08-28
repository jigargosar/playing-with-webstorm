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
export const tasks = () => computed(() => state.tasks).get()
const sIdx = () => computed(() => state.sIdx).get()

const clampedSIdx = () =>
  computed(
    () => (isEmpty(tasks()) ? NaN : clamp(0, tasks().length - 1)(sIdx())),
  ).get()
const sTask = () => computed(() => tasks()[clampedSIdx()]).get()
export const sId = () => computed(() => prop('id')(sTask())).get()

const setSIdx = idx => (state.sIdx = idx)

export const handleSelectTask = id => {
  const idx = findIndexById(id)(tasks())
  debugger
  return setSIdx(idx)
}
export const handleSelectedTaskToggleDone = () => xToggleProp('done', sTask())
export const handleSelectedTaskDelete = () => xRemoveAt(clampedSIdx(), tasks())
