import { createNewTaskWithDefaults } from '../models/Task'
import { times } from 'ramda'
import { findIndexById } from '../lib/ramda-ext'
import { computedFn, xRemoveById, xSet, xTogglePropById } from './xUtils'
import { observable } from 'mobx'
import { expr } from 'mobx-utils'
import { findIdByClampedIdx, propA, propS, propSOr } from '../lib/ramda-strict'

export const store = (() => {
  const store = observable.object(
    {
      _tasks: times(createNewTaskWithDefaults)(16),
      _selectedTaskIdx: 0,
      _hoveredTaskIdx: NaN,
      get selectedTaskId() {
        return findIdByClampedIdx(store._selectedTaskIdx, store._tasks)
      },
      get hoveredTaskId() {
        return store.getHoveredTaskId()
      },
      setSelectedTaskId: id =>
        xSet(store)('_selectedTaskIdx')(
          findIndexById(id)(propA('tasks')(store)),
        ),
      setHoveredTaskWithId: id =>
        xSet(store)('_hoveredTaskIdx')(
          findIndexById(id)(propA('tasks')(store)),
        ),
      unSetHoveredTaskWithId: id => {
        if (id === store.getHoveredTaskId()) {
          xSet(store)('_hoveredTaskIdx')(NaN)
        }
      },
      getHoveredTaskId: computedFn(() => {
        if (Number.isNaN(store._hoveredTaskIdx)) {
          return null
        }
        return findIdByClampedIdx(store._hoveredTaskIdx, propA('tasks')(store))
      }),
    },
    {},
    { name: 'store' },
  )

  return {
    isTaskHovered: ({ id }) =>
      expr(() => propSOr('')('hoveredTaskId')(store) === id),
    isTaskSelected: ({ id }) =>
      expr(() => propS('selectedTaskId')(store) === id),
    deleteAll: () => store._tasks.clear(),
    toggleSelectedTaskDone: () =>
      xTogglePropById('done', propS('selectedTaskId')(store), store._tasks),
    deleteSelectedTask: () =>
      xRemoveById(propS('selectedTaskId')(store))(store._tasks),
    selectTask: ({ id }) => store.setSelectedTaskId(id),
    mouseEnterTask: ({ id }) => store.setHoveredTaskWithId(id),
    mouseLeaveTask: ({ id }) => store.unSetHoveredTaskWithId(id),
  }
})()
