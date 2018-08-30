import { createNewTaskWithDefaults } from '../models/Task'
import {
  compose,
  filter,
  flatten,
  groupBy,
  indexOf,
  mapObjIndexed,
  pluck,
  prop,
  reject,
  sortBy,
  times,
  values,
} from 'ramda'
import { findIndexById } from '../lib/ramda-ext'
import { xRemoveById, xSet, xTogglePropById } from './xUtils'
import { observable } from 'mobx'
import { expr } from 'mobx-utils'
import { clampIdx, pathS, pathSOr, propS } from '../lib/ramda-strict'

const createSampleTasks = () => times(createNewTaskWithDefaults)(16)

export const store = (() => {
  const store = observable.object(
    {
      _tasks: createSampleTasks(),
      _selectedTaskIdx: 0,
      _hoveredTaskIdx: NaN,
      get taskGroups() {
        return compose(
          sortBy(group => indexOf(group.title, ['Todo', 'Done'])),
          values,
          mapObjIndexed((tasks, title) => ({ title, tasks })),
          groupBy(task => (task.done ? 'Done' : 'Todo')),
        )(store._tasks)
      },
      get flattenedTasks() {
        return compose(
          flatten,
          pluck('tasks'),
        )(store.taskGroups)
      },
      get selectedTaskIdx() {
        return clampIdx(store._selectedTaskIdx, store.flattenedTasks)
      },
      get hoveredTaskIdx() {
        if (Number.isNaN(store._hoveredTaskIdx)) {
          return null
        }
        return clampIdx(store._hoveredTaskIdx, store.flattenedTasks)
      },
      get selectedTaskId() {
        return pathS(['flattenedTasks', store.selectedTaskIdx, 'id'])(store)
      },
      get hoveredTaskId() {
        return pathSOr('')(['flattenedTasks', store.hoveredTaskIdx, 'id'])(
          store,
        )
      },
      isTaskAtSelected: ({ id }) => {
        return expr(() => store.selectedTaskId === id)
      },
      isTaskAtHovered: ({ id }) => {
        return expr(() => store.hoveredTaskId === id)
      },
      setSelectedTaskId: id =>
        xSet(store)('_selectedTaskIdx')(
          findIndexById(id)(store.flattenedTasks),
        ),
      setHoveredTaskWithId: id =>
        xSet(store)('_hoveredTaskIdx')(findIndexById(id)(store.flattenedTasks)),
      unSetHoveredTaskWithId: id => {
        if (id === store.hoveredTaskId) {
          xSet(store)('_hoveredTaskIdx')(NaN)
        }
      },
    },
    {},
    { name: 'store' },
  )

  return {
    getTodoTasks: () => expr(() => reject(prop('done'))(store._tasks)),
    getDoneTasks: () => expr(() => filter(prop('done'))(store._tasks)),
    isTaskSelected: store.isTaskAtSelected,
    isTaskHovered: store.isTaskAtHovered,
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
