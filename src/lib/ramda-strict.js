import { validate } from './validate'
import { curry, path, pathOr } from 'ramda'

const validateIO = (inputSpecs, outputSpecs = '*') => fn => (...args) => {
  validate(inputSpecs, args)
  const result = fn(...args)
  validate(outputSpecs, [result])
  return result
}

export const pathS = curry(validateIO('AO', 'S')(path))
export const pathSOr = curry(validateIO('SAO', 'S|Z')(pathOr))
export const propS = curry((p, obj) => pathS([p], obj))
export const propSOr = curry((def, p, obj) => pathSOr(def, [p], obj))
