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
export const propS = validateIO('SO', 'S')((p, obj) => pathS([p], obj))
export const propSOr = validateIO('SSO', 'S')((def, p, obj) =>
  pathSOr(def, [p], obj),
)

export const pathA = validateIO('AO', 'A')(path)
export const pathAOr = validateIO('SAO', 'A|Z')(pathOr)
export const propA = validateIO('SO', 'A')((p, obj) => pathA([p], obj))
export const propAOr = validateIO('SSO', 'A')((def, p, obj) =>
  pathAOr(def, [p], obj),
)
