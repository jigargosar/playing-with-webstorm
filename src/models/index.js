import {
  compose,
  filter,
  groupBy,
  indexOf,
  mapObjIndexed,
  prop,
  propEq,
  reject,
  sortBy,
  times,
  values,
} from 'ramda'
import { createNewTaskWithDefaults, systemContextLookup } from './Task'
import { pathS } from '../lib/ramda-strict'

export const createSampleTasks = () => times(createNewTaskWithDefaults)(16)

export const tabs = [
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
