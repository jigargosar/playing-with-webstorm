import { createNewTaskWithDefaults } from '../models/Task'
import { times } from 'ramda'
import { findIndexById } from '../lib/ramda-ext'
import { computedFn, xRemoveById, xSet, xTogglePropById } from './xUtils'
import { observable } from 'mobx'
import { expr } from 'mobx-utils'
import { findIdByClampedIdx, propS, propSOr } from '../lib/ramda-strict'

const createSampleTasks = () => times(createNewTaskWithDefaults)(16)

export const store = (() => {
  const store = observable.object(
    {
      _tasks: createSampleTasks(),
      _selectedTaskIdx: 0,
      _hoveredTaskIdx: NaN,
      get selectedTaskId() {
        return findIdByClampedIdx(store._selectedTaskIdx, store._tasks)
      },
      get hoveredTaskId() {
        return store.getHoveredTaskId()
      },
      setSelectedTaskId: id =>
        xSet(store)('_selectedTaskIdx')(findIndexById(id)(store._tasks)),
      setHoveredTaskWithId: id =>
        xSet(store)('_hoveredTaskIdx')(findIndexById(id)(store._tasks)),
      unSetHoveredTaskWithId: id => {
        if (id === store.getHoveredTaskId()) {
          xSet(store)('_hoveredTaskIdx')(NaN)
        }
      },
      getHoveredTaskId: computedFn(() => {
        if (Number.isNaN(store._hoveredTaskIdx)) {
          return null
        }
        return findIdByClampedIdx(store._hoveredTaskIdx, store._tasks)
      }),
    },
    {},
    { name: 'store' },
  )

  return {
    getTasks: () => store._tasks,
    isTaskHovered: ({ id }) =>
      expr(() => propSOr('')('hoveredTaskId')(store) === id),
    isTaskSelected: ({ id }) =>
      expr(() => propS('selectedTaskId')(store) === id),
    deleteAllTasks: () => store._tasks.clear(),
    addMoreTasks: () => store._tasks.unshift(...createSampleTasks()),
    toggleSelectedTaskDone: () =>
      xTogglePropById('done', propS('selectedTaskId')(store), store._tasks),
    deleteSelectedTask: () =>
      xRemoveById(propS('selectedTaskId')(store))(store._tasks),
    selectTask: ({ id }) => store.setSelectedTaskId(id),
    mouseEnterTask: ({ id }) => store.setHoveredTaskWithId(id),
    mouseLeaveTask: ({ id }) => store.unSetHoveredTaskWithId(id),
  }
})()
