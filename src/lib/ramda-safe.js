import { validate } from './validate'
import { not } from 'ramda'

export const vNot = boolean => {
  validate('B', [boolean])
  return not(boolean)
}
