import nanoid from 'nanoid'
import { randomArrayElement, randomBoolean, randomWords } from '../lib/fake'
import { validate } from '../lib/validate'
import { compose, fromPairs, isEmpty, toPairs } from 'ramda'
import { assert } from '../lib/assert'
import { propS } from '../lib/ramda-strict'

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
  toPairs(propS('id')),
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
