import * as nanoid from 'nanoid'
import {randomWords} from '../lib/fake'
import {validate} from '../lib/validate'

export function createTask({
  id = `task_${nanoid()}`,
  title = randomWords(),
  done = false,
  createdAt = Date.now(),
} = {}) {
  validate('SSBN', [id, title, done, createdAt])
  return { id, title, done, createdAt }
}

export function getTitle({ title }) {
  validate('S', [title])
  return title
}
