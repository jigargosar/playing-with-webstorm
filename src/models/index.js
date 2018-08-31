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
import { createNewTaskWithDefaults, systemContextLookup } from './Task'
import { pathS, validateIO } from '../lib/ramda-strict'

export const createSampleTaskList = () => times(createNewTaskWithDefaults)(16)

export const tabList = [
  { id: 'in_basket', title: 'INBOX' },
  { id: 'todo', title: 'TODO' },
  { id: 'some_day', title: 'SOME DAY' },
  { id: 'done', title: 'DONE' },
]

export function getTaskGroups(tabId, tasks) {
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

export const flattenGroupTasks = validateIO('A')(function flattenGroupTasks(
  taskGroups,
) {
  return compose(
    flatten,
    pluck('tasks'),
  )(taskGroups)
})
