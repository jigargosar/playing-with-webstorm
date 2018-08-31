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
  times,
  values,
} from 'ramda'
import { findIndexById } from '../lib/ramda-ext'
import { xRemoveById, xSet, xTogglePropById } from './xUtils'
import { observable } from 'mobx'
import { expr } from 'mobx-utils'
import { clampIdx, pathS } from '../lib/ramda-strict'

const createSampleTasks = () => times(createNewTaskWithDefaults)(16)

const tabs = [
  { id: 'in_basket', title: 'Inbox' },
  { id: 'todo', title: 'TODO' },
  { id: 'some_day', title: 'SOME DAY' },
  { id: 'done', title: 'DONE' },
]

function getTaskGroups(tabId, tasks) {
  return 'done' === tabId
    ? [
        compose(
          tasks => ({ id: 'done', title: 'Done', tasks }),
          filter(prop('done')),
        )(tasks),
      ]
    : compose(
        filter(propEq('id')(tabId)),
        sortBy(group => indexOf(group.id, ['in_basket', 'some_day'])),
        values,
        mapObjIndexed((tasks, id) => ({
          id,
          title: systemContextLookup[id].title,
          tasks,
        })),
        groupBy(pathS(['context', 'id'])),
        reject(prop('done')),
      )(tasks)
}

export const store = (() => {
  const store = observable.object(
    {
      _tasks: createSampleTasks(),
      _selectedTaskIdx: 0,
      _tab: 'in_basket',

      get taskGroups() {
        return getTaskGroups('in_basket', store._tasks)
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
      get selectedTaskId() {
        return pathS(['flattenedTasks', store.selectedTaskIdx, 'id'])(store)
      },
      isTaskAtSelected: ({ id }) => {
        return expr(() => store.selectedTaskId === id)
      },
      setSelectedTaskId: id =>
        xSet(store)('_selectedTaskIdx')(
          findIndexById(id)(store.flattenedTasks),
        ),
    },
    {},
    { name: 'store' },
  )

  return {
    setTabId: tab => (store._tab = tab),
    getCurrentTabId: () => store._tab,
    getTabs: () => expr(() => tabs),
    getTaskGroups: () => expr(() => store.taskGroups),
    isTaskSelected: store.isTaskAtSelected,
    deleteAllTasks: () => store._tasks.clear(),
    addMoreTasks: () => store._tasks.unshift(...createSampleTasks()),
    toggleTaskDone: ({ id }) => xTogglePropById('done', id, store._tasks),
    deleteTask: ({ id }) => xRemoveById(id)(store._tasks),
    selectTask: ({ id }) => store.setSelectedTaskId(id),
  }
})()
