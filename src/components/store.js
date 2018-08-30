import { createNewTaskWithDefaults } from '../models/Task'
import { times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { xComputedFn, xGet, xRemoveById, xSet, xTogglePropById } from './xUtils'
import { extendObservable, observable } from 'mobx'
import { expr } from 'mobx-utils'

function findIdByClampedModelIdx(idx, collectionName, store) {
  const clampedIdx = clampIdx(idx)(store[collectionName])
  return xGet(store)([collectionName, clampedIdx, 'id'])
}

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

  const taskId = {
    setSelected: id => xSet(store)('_sIdx')(findIndexById(id)(store.tasks)),
    setHovered: id => xSet(store)('_hIdx')(findIndexById(id)(store.tasks)),
    unSetHovered: id => {
      if (id === taskId.hovered()) {
        xSet(store)('_hIdx')(NaN)
      }
    },
    selected: xComputedFn(() => {
      return findIdByClampedModelIdx(store._sIdx, 'tasks', store)
    }),
    hovered: xComputedFn(() => {
      return findIdByClampedModelIdx(store._hIdx, 'tasks', store)
    }),
  }

  extendObservable(store, {
    isTaskHovered: task => expr(() => taskId.hovered() === task.id),
    isTaskSelected: task => expr(() => taskId.selected() === task.id),
    deleteAll: () => store.tasks.clear(),
    toggleSelectedTaskDone: () =>
      xTogglePropById('done', taskId.selected(), store.tasks),
    deleteSelectedTask: () => xRemoveById(taskId.selected())(store.tasks),
    selectTask: ({ id }) => taskId.setSelected(id),
    mouseEnterTask: ({ id }) => taskId.setHovered(id),
    mouseLeaveTask: ({ id }) => taskId.unSetHovered(id),
  })
  return store
})()
