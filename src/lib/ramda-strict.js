import { validate } from './validate'
import { curry, defaultTo, map as _map, not as _not, path } from 'ramda'

const validateIO = (inputSpecs, outputSpecs = '*') => fn => (...args) => {
  validate(inputSpecs, args)
  const result = fn(...args)
  validate(outputSpecs, [result])
  return result
}

export const not = validateIO('B')(_not)
export const map = validateIO('O|A')(_map)

export const defaultToS = curry((def, val) => {
  validate('SS|SZ', [def, val])
  return defaultTo(def, val)
})

export const pathS = curry(
  validateIO('AO')((paths, obj) => {
    const result = path(paths, obj)
    validate('S', [result])
    return result
  }),
)
export const pathSOr = curry(
  validateIO('SAO')((def, paths, obj) => {
    return defaultToS(def)(path(paths, obj))
  }),
)
export const propS = curry((p, obj) => pathS([p], obj))
export const propSOr = curry((def, p, obj) => pathSOr(def, [p], obj))
