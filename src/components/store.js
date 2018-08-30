import { createNewTaskWithDefaults } from '../models/Task'
import { times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { computedFn, xGet, xRemoveById, xSet, xTogglePropById } from './xUtils'
import { extendObservable, observable } from 'mobx'
import { expr } from 'mobx-utils'
import { propS, propSOr } from '../lib/ramda-strict'

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
    setSelectedTaskId: id =>
      xSet(store)('_selectedTaskIdx')(findIndexById(id)(store.tasks)),
    setHoveredTaskWithId: id =>
      xSet(store)('_hoveredTaskIdx')(findIndexById(id)(store.tasks)),
    unSetHoveredTaskWithId: id => {
      if (id === taskId.getHoveredTaskId()) {
        xSet(store)('_hoveredTaskIdx')(NaN)
      }
    },
    getSelectedTaskId: computedFn(() => {
      return findIdByClampedModelIdx(store._selectedTaskIdx, 'tasks', store)
    }),
    getHoveredTaskId: computedFn(() => {
      return findIdByClampedModelIdx(store._hoveredTaskIdx, 'tasks', store)
    }),
    get selectedTaskId() {
      return taskId.getSelectedTaskId()
    },
    get hoveredTaskId() {
      return taskId.getHoveredTaskId()
    },
  }

  extendObservable(store, {
    isTaskHovered: task =>
      expr(() => propSOr('')('hoveredTaskId')(taskId) === task.id),
    isTaskSelected: task =>
      expr(() => propS('selectedTaskId')(taskId) === task.id),
    deleteAll: () => store.tasks.clear(),
    toggleSelectedTaskDone: () =>
      xTogglePropById('done', propS('selectedTaskId')(taskId), store.tasks),
    deleteSelectedTask: () =>
      xRemoveById(propS('selectedTaskId')(taskId))(store.tasks),
    selectTask: ({ id }) => taskId.setSelectedTaskId(id),
    mouseEnterTask: ({ id }) => taskId.setHoveredTaskWithId(id),
    mouseLeaveTask: ({ id }) => taskId.unSetHoveredTaskWithId(id),
  })
  return store
})()
