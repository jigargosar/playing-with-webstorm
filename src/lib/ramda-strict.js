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

export const pathS = validateIO('AO|AA', 'S')(path)
export const pathSOr = validateIO('SAO|SAA', 'S|Z')(pathOr)
export const propS = validateIO('SO|SA', 'S')((p, obj) => pathS([p], obj))
export const propSOr = validateIO('SSO|SSA', 'S')((def, p, obj) =>
  pathSOr(def, [p], obj),
)

export const pathA = validateIO('AO|AA', 'A')(path)
export const pathAOr = validateIO('SAO|SAA', 'A|Z')(pathOr)
export const propA = validateIO('SO|SA', 'A')((p, obj) => pathA([p], obj))
export const propAOr = validateIO('SSO|SSA', 'A')((def, p, obj) =>
  pathAOr(def, [p], obj),
)
