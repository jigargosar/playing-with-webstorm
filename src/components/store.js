import { compose, flatten, pluck } from 'ramda'
import { findIndexById } from '../lib/ramda-ext'
import { xRemoveById, xSet, xTogglePropById } from './xUtils'
import { observable } from 'mobx'
import { expr } from 'mobx-utils'
import { clampIdx, pathS } from '../lib/ramda-strict'
import { createSampleTaskList, getTaskGroups, tabList } from '../models'

export const store = (() => {
  const store = observable.object(
    {
      _tasks: createSampleTaskList(),
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
    getTabs: () => expr(() => tabList),
    getTaskGroups: () => expr(() => store.taskGroups),
    isTaskSelected: store.isTaskAtSelected,
    deleteAllTasks: () => store._tasks.clear(),
    addMoreTasks: () => store._tasks.unshift(...createSampleTaskList()),
    toggleTaskDone: ({ id }) => xTogglePropById('done', id, store._tasks),
    deleteTask: ({ id }) => xRemoveById(id)(store._tasks),
    selectTask: ({ id }) => store.setSelectedTaskId(id),
  }
})()
