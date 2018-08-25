import * as nanoid from 'nanoid'
import {randomWords} from '../lib/fake'

export function Task({
  id = `task/${nanoid()}`,
  title = randomWords(),
  done = false,
  createdAt = Date.now(),
} = {}) {
  return { id, title, done, dueAt, createdAt }
}
