import nanoid from 'nanoid'
import { randomArrayElement, randomBoolean, randomWords } from '../lib/fake'
import { validate } from '../lib/validate'
import { isEmpty } from 'ramda'
import { assert } from '../lib/assert'

function Task({ id, title, done, createdAt, context, ...other }) {
  validate('SSBNOO', [id, title, done, createdAt, context, other])
  assert(isEmpty(other))
  return { id, title, done, createdAt, context }
}

const systemContexts = [
  { id: 'in_basket', title: 'Inbox', type: 'system' },
  { id: 'some_day', title: 'SomeDay', type: 'system' },
]

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
