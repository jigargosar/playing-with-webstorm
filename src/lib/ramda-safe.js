import { validate } from './validate'
import { not } from 'ramda'

const tapValidateArgs = spec => fn => (...args) => {
  validate(spec, ...args)
  return fn(...args)
}

export const vNot = boolean => {
  validate('B', [boolean])
  return not(boolean)
}
