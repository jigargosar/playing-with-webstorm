import * as nanoid from 'nanoid'
import { randomWords } from '../lib/fake'
import { validate } from '../lib/validate'
import { merge } from 'ramda'

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

export function setDone(done, task) {
  validate('BO', [done, task])
  return merge(task, { done })
}

export function isDone({ done }) {
  validate('B', [done])
  return done
}
