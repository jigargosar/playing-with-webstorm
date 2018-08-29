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
      _hIdx: NaN,
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
        equals(sGet('sId')),
        prop('id'),
      )
    },
    get hTask() {
      const idx = clampIdx(store._hIdx)(store.tasks)
      return sGet(['tasks', idx])
    },
    get hId() {
      return sGet('hTask.id')
    },
    get isTaskHovered() {
      return compose(
        equals(store.hId),
        prop('id'),
      )
    },
    setSIdx: xSet(store)('_sIdx'),
    setHIdx: xSet(store)('_hIdx'),
    setSId: id => store.setSIdx(findIndexById(id)(store.tasks)),
    setHId: id => {
      return store.setHIdx(findIndexById(id)(store.tasks))
    },
    unSetHId: id => {
      if (id === sGet('_hId')) {
        store.setHIdx(NaN)
      }
    },
    deleteAll: () => store.tasks.clear(),
    toggleSelectedTaskDone: () => xToggleProp('done', store.sTask),
    deleteSelectedTask: () => xRemoveById(store.sId)(store.tasks),
  })
  return store
})()

export const handleSelectTask = id => () => store.setSId(id)

export const handleMouseOverTask = id => () => store.setHId(id)

export const handleMouseLeaveTask = id => () => store.unSetHId(id)
