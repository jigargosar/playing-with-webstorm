import { createNewTaskWithDefaults } from '../models/Task'
import { compose, equals, prop, times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { xGet, xRemoveById, xSet, xToggleProp } from './xUtils'
import { extendObservable, observable } from 'mobx'
import { expr } from 'mobx-utils'

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
  const sSet = xSet(store)

  const setSIdx = sSet('_sIdx')
  const setHIdx = sSet('_hIdx')

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
    isTaskHovered: task => expr(() => store.hId === task.id),
    setHId: id => setHIdx(findIndexById(id)(store.tasks)),
    setSId: id => setSIdx(findIndexById(id)(store.tasks)),
    unSetHId: id => {
      if (id === store.hId) {
        setHIdx(NaN)
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
