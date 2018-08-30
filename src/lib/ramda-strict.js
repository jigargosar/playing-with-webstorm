import { validate } from './validate'
import { map as _map, not as _not } from 'ramda'

const tapValidateArgs = spec => fn => (...args) => {
  validate(spec, args)
  return fn(...args)
}

export const not = tapValidateArgs('B')(_not)
export const map = tapValidateArgs('O|A')(_map)
