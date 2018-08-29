import { createNewTaskWithDefaults } from '../models/Task'
import { compose, curryN, equals, prop, times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { xRemoveAt, xToggleProp } from './xUtils'
import { computed, extendObservable, observable } from 'mobx'
import dset from 'dset'
import dget from 'dlv'

export const xSet = curryN(3, dset)
export const xGet = curryN(2, dget)
export const xGetOr = curryN(3, dget)
export const computedFn = fn => () => computed(fn).get()

export const store = (() => {
  const store = observable.object(
    {
      tasks: times(createNewTaskWithDefaults)(16),
      _sIdx: 0,
    },
    {},
    { name: 'store' },
  )
  const sGet = xGet(store)
  extendObservable(store, {
    get sIdx() {
      return clampIdx(store._sIdx)(store.tasks)
    },
    get sTask() {
      return sGet(`tasks.${store.sIdx}`)
    },
    get sId() {
      return sGet(`sTask.id`)
    },
    get isTaskSelected() {
      return compose(
        equals(sGet(`sTask.id`)),
        prop('id'),
      )
    },
    setSIdx: xSet(store)('_sIdx'),
  })
  return store
})()

export const handleSelectTask = id => () =>
  store.setSIdx(findIndexById(id)(store.tasks))
export const handleToggleDoneSelectedTask = () =>
  xToggleProp('done', store.sTask)
export const handleDeleteSelectedTask = () => xRemoveAt(store.sIdx, store.tasks)
