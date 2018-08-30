import { createNewTaskWithDefaults } from '../models/Task'
import {
  __,
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
        if (Number.isNaN(store._hoveredTaskIdx)) {
          return null
        }
        return findIdByClampedIdx(store._hoveredTaskIdx, store._tasks)
      },
      isTaskAtSelectedIdx: ({ id }) => {
        return expr(
          () =>
            store._selectedTaskIdx ===
            findIndexById(id)(store.getFlattenedTasks()),
        )
      },
      setSelectedTaskId: id =>
        xSet(store)('_selectedTaskIdx')(
          findIndexById(id)(store.getFlattenedTasks()),
        ),
      setHoveredTaskWithId: id =>
        xSet(store)('_hoveredTaskIdx')(findIndexById(id)(store._tasks)),
      unSetHoveredTaskWithId: id => {
        if (id === store.hoveredTaskId) {
          xSet(store)('_hoveredTaskIdx')(NaN)
        }
      },
      getFlattenedTasks: () =>
        compose(
          flatten,
          pluck('tasks'),
        )(store.getTaskGroups()),
      getTaskGroups: () => {
        const titleOrder = ['Todo', 'Done']
        const taskGroups = compose(
          sortBy(
            compose(
              indexOf(__, titleOrder),
              prop('title'),
            ),
          ),
          values,
          mapObjIndexed((tasks, title) => ({ title, tasks })),
          groupBy(
            compose(
              b => (b ? 'Done' : 'Todo'),
              prop('done'),
            ),
          ),
        )(store._tasks)
        console.log('taskGroups', taskGroups)
        return taskGroups
      },
    },
    {},
    { name: 'store' },
  )

  console.log('getFlattenedTasks', store.getFlattenedTasks())
  return {
    getTodoTasks: () => expr(() => reject(prop('done'))(store._tasks)),
    getDoneTasks: () => expr(() => filter(prop('done'))(store._tasks)),
    isTaskHovered: ({ id }) =>
      expr(() => propSOr('')('hoveredTaskId')(store) === id),
    isTaskSelected: store.isTaskAtSelectedIdx,
    // isTaskSelected: ({ id }) =>
    //   expr(() => propS('selectedTaskId')(store) === id),
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
