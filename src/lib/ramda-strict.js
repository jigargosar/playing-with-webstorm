import { validate } from './validate'
import { curryN, path, pathOr } from 'ramda'

const validateIO = (inputSpecs, outputSpecs = '*') => fn => {
  return curryN(fn.length)((...args) => {
    validate(inputSpecs, args)
    const result = fn(...args)
    validate(outputSpecs, [result])
    return result
  })
}

export const pathS = validateIO('AO', 'S')(path)
export const pathSOr = validateIO('SAO', 'S|Z')(pathOr)
export const propS = (p, obj) => pathS([p], obj)
export const propSOr = (def, p, obj) => pathSOr(def, [p], obj)
