import { createNewTaskWithDefaults } from '../models/Task'
import { times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { computedFn, xGet, xRemoveById, xSet, xTogglePropById } from './xUtils'
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
      _selectedTaskIdx: 0,
      _hoveredTaskIdx: NaN,
    },
    {},
    { name: 'store' },
  )

  const taskId = {
    setSelected: id =>
      xSet(store)('_selectedTaskIdx')(findIndexById(id)(store.tasks)),
    setHovered: id =>
      xSet(store)('_hoveredTaskIdx')(findIndexById(id)(store.tasks)),
    unSetHovered: id => {
      if (id === taskId.getHoveredId()) {
        xSet(store)('_hoveredTaskIdx')(NaN)
      }
    },
    getSelectedId: computedFn(() => {
      return findIdByClampedModelIdx(store._selectedTaskIdx, 'tasks', store)
    }),
    getHoveredId: computedFn(() => {
      return findIdByClampedModelIdx(store._hoveredTaskIdx, 'tasks', store)
    }),
  }

  extendObservable(store, {
    isTaskHovered: task => expr(() => taskId.getHoveredId() === task.id),
    isTaskSelected: task => expr(() => taskId.getSelectedId() === task.id),
    deleteAll: () => store.tasks.clear(),
    toggleSelectedTaskDone: () =>
      xTogglePropById('done', taskId.getSelectedId(), store.tasks),
    deleteSelectedTask: () => xRemoveById(taskId.getSelectedId())(store.tasks),
    selectTask: ({ id }) => taskId.setSelected(id),
    mouseEnterTask: ({ id }) => taskId.setHovered(id),
    mouseLeaveTask: ({ id }) => taskId.unSetHovered(id),
  })
  return store
})()
