import { createNewTaskWithDefaults } from '../models/Task'
import { compose, equals, prop, times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { xGet, xRemoveById, xSet, xToggleProp } from './xUtils'
import { extendObservable, observable } from 'mobx'

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
    get sTask() {
      const idx = clampIdx(store._sIdx)(store.tasks)
      return sGet(['tasks', idx])
    },
    get sId() {
      return sGet('sTask.id')
    },
    get isTaskSelected() {
      return compose(
        equals(sGet('sTask.id')),
        prop('id'),
      )
    },
    setSIdx: xSet(store)('_sIdx'),
    deleteAll: () => store.tasks.clear(),
    toggleSelectedTaskDone: () => xToggleProp('done', store.sTask),
    deleteSelectedTask: () => xRemoveById(store.sId)(store.tasks),
  })
  return store
})()

export const handleSelectTask = id => () =>
  store.setSIdx(findIndexById(id)(store.tasks))

export const handleMouseOverTask = id => () =>
  store.setSIdx(findIndexById(id)(store.tasks))

export const handleMouseLeaveTask = id => () =>
  store.setSIdx(findIndexById(id)(store.tasks))
