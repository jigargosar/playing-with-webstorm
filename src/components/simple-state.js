import { times } from 'ramda'
import { createNewTaskWithDefaults } from '../models/Task'

export function initialState() {
  return {
    tasks: times(createNewTaskWithDefaults)(8),
  }
}
