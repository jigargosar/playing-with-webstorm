import { createNewTaskWithDefaults, systemContextLookup } from '../models/Task'
import {
  compose,
  filter,
  flatten,
  groupBy,
  indexOf,
  mapObjIndexed,
  pluck,
  prop,
  propEq,
  reject,
  sortBy,
  tap,
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
      _tab: 'in_basket',

      get doneTaskGroup() {
        return compose(
          tasks => ({ id: 'done', title: 'Done', tasks }),
          filter(prop('done')),
        )(store._tasks)
      },
      get taskGroups() {
        if ('done' === store._tab) {
          return [store.doneTaskGroup]
        }
        return compose(
          filter(propEq('id')(store._tab)),
          tap(console.log),
          sortBy(group => indexOf(group.id, ['in_basket', 'some_day'])),
          values,
          mapObjIndexed((tasks, id) => ({
            id,
            title: systemContextLookup[id].title,
            tasks,
          })),
          groupBy(pathS(['context', 'id'])),
          reject(prop('done')),
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
    setTab: tab => (store._tab = tab),
    getTab: () => store._tab,
    getTabs: () =>
      expr(() => [
        { tab: 'in_basket', title: 'Inbox' },
        { tab: 'todo', title: 'TODO' },
        { tab: 'some_day', title: 'SOME DAY' },
        { tab: 'done', title: 'DONE' },
      ]),
    getTaskGroups: () => expr(() => store.taskGroups),
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
