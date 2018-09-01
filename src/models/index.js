import {
  compose,
  filter,
  flatten,
  groupBy,
  indexOf,
  isEmpty,
  mapObjIndexed,
  pluck,
  prop,
  propEq,
  reject,
  sortBy,
  times,
  values,
} from 'ramda'
import { mapA, pathS, validateIO } from '../lib/ramda-strict'
import nanoid from 'nanoid'
import { randomArrayElement, randomBoolean, randomWords } from '../lib/fake'
import { validate } from '../lib/validate'
import { assert } from '../lib/assert'

function Task({ id, title, done, createdAt, systemListId, ...other }) {
  // noinspection SpellCheckingInspection
  validate('SSBNSO', [id, title, done, createdAt, systemListId, other])
  assert(isEmpty(other))
  return { id, title, done, createdAt, systemListId }
}

export const systemListIds = [
  'in_basket',
  'next_actions',
  'some_day',
  'projects',
]

export const systemListIdLookup = {
  in_basket: { type: 'in_basket', title: 'Inbox' },
  next_actions: { type: 'next_actions', title: 'Next Actions' },
  projects: { type: 'projects', title: 'Projects' },
  some_day: { type: 'some_day', title: 'SomeDay' },
}

export function createNewTaskWithDefaults() {
  const defaults = {
    id: `task_${nanoid()}`,
    title: randomWords(),
    done: randomBoolean(),
    createdAt: Date.now(),
    systemListId: randomArrayElement(systemListIds),
  }
  return Task(defaults)
}

export const createSampleTaskList = () => times(createNewTaskWithDefaults)(16)

export const tabList = [
  ...mapA(id => ({
    id,
    type: 'system_list',
    title: systemListIdLookup[id].title,
  }))(systemListIds),
  { id: 'done', type: 'filter', title: 'DONE' },
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
          sortBy(id => indexOf(id, systemListIds)),
          values,
          mapObjIndexed((tasks, systemListId) => ({
            id: systemListId,
            title: systemListIdLookup[systemListId].title,
            tasks,
          })),
          groupBy(pathS(['systemListId'])),
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
