import { validate } from './validate'
import { curry, defaultTo, map as _map, not as _not, path } from 'ramda'

const validateArgs = spec => fn => (...args) => {
  validate(spec, args)
  return fn(...args)
}

export const not = validateArgs('B')(_not)
export const map = validateArgs('O|A')(_map)

export const defaultToS = curry((def, val) => {
  validate('SS|SZ', [def, val])
  return defaultTo(def, val)
})

export const pathS = curry(
  validateArgs('AO')((paths, obj) => {
    const result = path(paths, obj)
    validate('S', [result])
    return result
  }),
)
export const pathSOr = curry(
  validateArgs('SAO')((def, paths, obj) => {
    return defaultToS(def)(path(paths, obj))
  }),
)
export const propS = curry((p, obj) => pathS([p], obj))
export const propSOr = curry((def, p, obj) => pathSOr(def, [p], obj))
