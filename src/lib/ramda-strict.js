import { validate } from './validate'
import { curry, defaultTo, map as _map, not as _not, path } from 'ramda'

const tapValidateArgs = spec => fn => (...args) => {
  validate(spec, args)
  return fn(...args)
}

export const not = tapValidateArgs('B')(_not)
export const map = tapValidateArgs('O|A')(_map)
export const pathS = curry((paths, obj) => {
  validate('AO', [paths, obj])
  const result = path(paths, obj)
  validate('S', [result])
  return result
})
export const pathSOr = curry((def, paths, obj) => {
  validate('SAO', [def, paths, obj])
  const result = path(paths, obj)
  validate('S|Z', [result])
  return defaultTo(def)(result)
})
export const propS = curry((p, obj) => pathS([p], obj))
export const propSOr = curry((def, p, obj) => pathSOr(def, [p], obj))
