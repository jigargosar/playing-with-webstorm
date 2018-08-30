import { createNewTaskWithDefaults } from '../models/Task'
import { times } from 'ramda'
import { clampIdx, findIndexById } from '../lib/ramda-ext'
import { computedFn, xRemoveById, xSet, xTogglePropById } from './xUtils'
import { extendObservable, observable } from 'mobx'
import { expr } from 'mobx-utils'
import { pathS, propA, propS, propSOr } from '../lib/ramda-strict'
import { validate } from '../lib/validate'

function findIdByClampedIdx(idx, list) {
  validate('NA', [idx, list])
  const clampedIdx = clampIdx(idx)(list)
  return pathS([clampedIdx, 'id'])(list)
}

export const store = (() => {
  const store = observable.object(
    {
      _tasks: times(createNewTaskWithDefaults)(16),
      _selectedTaskIdx: 0,
      _hoveredTaskIdx: NaN,
      get selectedTaskId() {
        return store.getSelectedTaskId()
      },
      get hoveredTaskId() {
        return store.getHoveredTaskId()
      },
      get tasks() {
        return store._tasks
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
      getSelectedTaskId: computedFn(() => {
        return findIdByClampedIdx(store._selectedTaskIdx, propA('tasks')(store))
      }),
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

  extendObservable(store, {
    isTaskHovered: ({ id }) =>
      expr(() => propSOr('')('hoveredTaskId')(store) === id),
    isTaskSelected: ({ id }) =>
      expr(() => propS('selectedTaskId')(store) === id),
    deleteAll: () => store.tasks.clear(),
    toggleSelectedTaskDone: () =>
      xTogglePropById('done', propS('selectedTaskId')(store), store.tasks),
    deleteSelectedTask: () =>
      xRemoveById(propS('selectedTaskId')(store))(store.tasks),
    selectTask: ({ id }) => store.setSelectedTaskId(id),
    mouseEnterTask: ({ id }) => store.setHoveredTaskWithId(id),
    mouseLeaveTask: ({ id }) => store.unSetHoveredTaskWithId(id),
  })
  return store
})()
