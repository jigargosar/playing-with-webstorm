import { createNewTaskWithDefaults } from '../models/Task'
import { prop, times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { xRemoveAt, xToggleProp } from './xUtils'
import { computed, observable } from 'mobx'

export const store = observable.object(
  {
    tasks: times(createNewTaskWithDefaults)(16),
    _sIdx: 0,
    get sIdx() {
      return clampIdx(store._sIdx)(store.tasks)
    },
    setSIdx: idx => (store._sIdx = idx),
  },
  {},
  { name: 'store' },
)

const computedFn = fn => () => computed(fn).get()

const clampedSIdx = computedFn(() => clampIdx(store._sIdx)(store.tasks))
const sTask = computedFn(() => store.tasks[clampedSIdx()])
export const sId = computedFn(() => prop('id')(sTask()))

export const handleSelectTask = id => () => {
  const idx = findIndexById(id)(store.tasks)
  return store.setSIdx(idx)
}
export const handleSelectedTaskToggleDone = () => xToggleProp('done', sTask())
export const handleSelectedTaskDelete = () =>
  xRemoveAt(clampedSIdx(), store.tasks)
