import { validate } from './validate'
import { not as _not } from 'ramda'

const tapValidateArgs = spec => fn => (...args) => {
  validate(spec, args)
  return fn(...args)
}

export const not = tapValidateArgs('B')(_not)
