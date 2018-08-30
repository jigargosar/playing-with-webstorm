import { createNewTaskWithDefaults } from '../models/Task'
import { times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { xComputedFn, xGet, xRemoveById, xSet, xTogglePropById } from './xUtils'
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

  const taskId = {
    selected: xComputedFn(() => {
      const idx = store._sIdx
      const clampedIdx = clampIdx(idx)(store.tasks)
      return sGet(['tasks', clampedIdx, 'id'])
    }),
    hovered: xComputedFn(() => {
      const idx = store._hIdx
      const clampedIdx = clampIdx(idx)(store.tasks)
      return sGet(['tasks', clampedIdx, 'id'])
    }),
  }

  extendObservable(store, {
    isTaskHovered: task => expr(() => taskId.hovered() === task.id),
    isTaskSelected: task => expr(() => taskId.selected() === task.id),
    setSId: id => setSIdx(findIndexById(id)(store.tasks)),
    setHId: id => setHIdx(findIndexById(id)(store.tasks)),
    unSetHId: id => {
      if (id === taskId.hovered()) {
        setHIdx(NaN)
      }
    },
    deleteAll: () => store.tasks.clear(),
    toggleSelectedTaskDone: () =>
      xTogglePropById('done', taskId.selected(), store.tasks),
    deleteSelectedTask: () => xRemoveById(taskId.selected())(store.tasks),
  })
  return store
})()

export const handleSelectTask = id => () => store.setSId(id)

export const handleMouseOverTask = id => () => store.setHId(id)

export const handleMouseLeaveTask = id => () => store.unSetHId(id)
