import * as nanoid from 'nanoid'
import {randomWords} from '../lib/fake'

export function Task({
  id = `task_${nanoid()}`,
  title = randomWords(),
  done = false,
  createdAt = Date.now(),
} = {}) {
  return { id, title, done, dueAt, createdAt }
}
