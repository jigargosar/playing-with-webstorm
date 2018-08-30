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

  const taskId = {
    setSelected: id => xSet(store)('_sIdx')(findIndexById(id)(store.tasks)),
    setHovered: id => xSet(store)('_hIdx')(findIndexById(id)(store.tasks)),
    unSetHovered: id => {
      if (id === taskId.isHovered()) {
        xSet(store)('_hIdx')(NaN)
      }
    },
    isSelected: xComputedFn(() => {
      const idx = store._sIdx
      const clampedIdx = clampIdx(idx)(store.tasks)
      return xGet(store)(['tasks', clampedIdx, 'id'])
    }),
    isHovered: xComputedFn(() => {
      const idx = store._hIdx
      const clampedIdx = clampIdx(idx)(store.tasks)
      return xGet(store)(['tasks', clampedIdx, 'id'])
    }),
  }

  extendObservable(store, {
    isTaskHovered: task => expr(() => taskId.isHovered() === task.id),
    isTaskSelected: task => expr(() => taskId.isSelected() === task.id),
    deleteAll: () => store.tasks.clear(),
    toggleSelectedTaskDone: () =>
      xTogglePropById('done', taskId.isSelected(), store.tasks),
    deleteSelectedTask: () => xRemoveById(taskId.isSelected())(store.tasks),
    selectTask: ({ id }) => taskId.setSelected(id),
    mouseEnterTask: ({ id }) => taskId.setHovered(id),
    mouseLeaveTask: ({ id }) => taskId.unSetHovered(id),
  })
  return store
})()
