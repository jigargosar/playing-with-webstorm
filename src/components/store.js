import { createNewTaskWithDefaults } from '../models/Task'
import { curryN, times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { xRemoveAt, xToggleProp } from './xUtils'
import { computed, extendObservable, observable } from 'mobx'
import dset from 'dset'
import dget from 'dlv'

export const xSet = curryN(3, dset)
export const xGet = curryN(2, dget)
export const xGetOr = curryN(3, dget)

export const store = (() => {
  const store = observable.object(
    {
      tasks: times(createNewTaskWithDefaults)(16),
      _sIdx: 0,
      get sIdx() {
        return clampIdx(store._sIdx)(store.tasks)
      },
      get sTask() {
        return xGet(store, `tasks.${store.sIdx}`)
      },
      get sId() {
        return xGet(store, `sTask.id`)
      },
    },
    {},
    { name: 'store' },
  )
  extendObservable(store, { setSIdx: xSet(store)('_sIdx') })
  return store
})()

const computedFn = fn => () => computed(fn).get()

export const sId = computedFn(() => xGet(store, 'sTask.id'))

export const handleSelectTask = id => () =>
  store.setSIdx(findIndexById(id)(store.tasks))
export const handleToggleDoneSelectedTask = () =>
  xToggleProp('done', store.sTask)
export const handleDeleteSelectedTask = () => xRemoveAt(store.sIdx, store.tasks)
