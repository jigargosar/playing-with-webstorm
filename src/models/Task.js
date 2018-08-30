import nanoid from 'nanoid'
import { randomWords } from '../lib/fake'
import { validate } from '../lib/validate'

function Task({ id, title, done, createdAt }) {
  validate('SSBN', [id, title, done, createdAt])
  return { id, title, done, createdAt }
}

export function createNewTaskWithDefaults() {
  const defaults = {
    id: `task_${nanoid()}`,
    title: randomWords(),
    done: false,
    createdAt: Date.now(),
  }
  return Task(defaults)
}
