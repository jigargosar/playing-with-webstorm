import * as nanoid from 'nanoid'
import { randomWords } from '../lib/fake'
import { validate } from '../lib/validate'
import { lensProp, not, over } from 'ramda'

export function createTask({
  id = `task_${nanoid()}`,
  title = randomWords(),
  done = false,
  createdAt = Date.now(),
} = {}) {
  validate('SSBN', [id, title, done, createdAt])
  return { id, title, done, createdAt }
}

export function createNewTaskWithDefaults() {
  return createTask()
}

export function getTitle({ title }) {
  validate('S', [title])
  return title
}

const vNot = boolean => {
  validate('B', [boolean])
  return not(boolean)
}

const overProp = propName => over(lensProp(propName))

const toggleProp = propName => overProp(propName)(vNot)

export function isDone({ done }) {
  validate('B', [done])
  return done
}

export const toggleTaskDone = toggleProp('done')
