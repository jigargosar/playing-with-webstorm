import {
  compose,
  filter,
  flatten,
  fromPairs,
  groupBy,
  indexOf,
  isEmpty,
  map,
  mapObjIndexed,
  pluck,
  prop,
  propEq,
  reject,
  sortBy,
  times,
  values,
} from 'ramda'
import { pathS, validateIO } from '../lib/ramda-strict'
import nanoid from 'nanoid'
import { randomArrayElement, randomBoolean, randomWords } from '../lib/fake'
import { validate } from '../lib/validate'
import { assert } from '../lib/assert'

function Task({ id, title, done, createdAt, context, ...other }) {
  validate('SSBNOO', [id, title, done, createdAt, context, other])
  assert(isEmpty(other))
  return { id, title, done, createdAt, context }
}

export const systemContexts = [
  { id: 'in_basket', title: 'Inbox', type: 'system' },
  { id: 'some_day', title: 'SomeDay', type: 'system' },
]
export const systemContextLookup = compose(
  fromPairs,
  map(c => [c.id, c]),
)(systemContexts)

export function createNewTaskWithDefaults() {
  const defaults = {
    id: `task_${nanoid()}`,
    title: randomWords(),
    done: randomBoolean(),
    createdAt: Date.now(),
    context: randomArrayElement(systemContexts),
  }
  return Task(defaults)
}

export const createSampleTaskList = () => times(createNewTaskWithDefaults)(16)

export const tabList = [
  { id: 'in_basket', title: 'INBOX' },
  { id: 'next_actions', title: 'NEXT ACTIONS' },
  { id: 'some_day', title: 'SOME DAY' },
  { id: 'done', title: 'DONE' },
]

export const getTaskGroupsForTab = validateIO('SA', 'A')(
  function getTaskGroupForTab(tabId, taskList) {
    return 'done' === tabId
      ? [
          compose(
            tasks => ({ id: 'done', title: 'Done', tasks }),
            filter(prop('done')),
          )(taskList),
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
        )(taskList)
  },
)

export const flattenTasksFromGroups = validateIO('A', 'A')(
  function flattenGroupTasks(taskGroups) {
    return compose(
      flatten,
      pluck('tasks'),
    )(taskGroups)
  },
)
