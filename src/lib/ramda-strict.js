import { validate } from './validate'
import { curry, defaultTo, map as _map, not as _not, path } from 'ramda'

const tapValidateArgs = spec => fn => (...args) => {
  validate(spec, args)
  return fn(...args)
}

export const not = tapValidateArgs('B')(_not)
export const map = tapValidateArgs('O|A')(_map)

export const defaultToS = curry((def, val) => {
  validate('SS|SZ', [def, val])
  return defaultTo(def, val)
})

export const pathS = curry(
  tapValidateArgs('AO')((paths, obj) => {
    const result = path(paths, obj)
    validate('S', [result])
    return result
  }),
)
export const pathSOr = curry(
  tapValidateArgs('SAO')((def, paths, obj) => {
    return defaultToS(def)(path(paths, obj))
  }),
)
export const propS = curry((p, obj) => pathS([p], obj))
export const propSOr = curry((def, p, obj) => pathSOr(def, [p], obj))
