import { validate } from './validate'
import {
  clamp,
  compose,
  concat,
  curryN,
  isEmpty,
  join,
  map,
  partial,
  pathOr,
  split,
} from 'ramda'
import flip from 'ramda/es/flip'
import tap from 'ramda/es/tap'
import path from 'ramda/es/path'

function specsToSignature(i, o) {
  const arrow = ' => '
  return `${compose(
    flip(concat)(`${arrow} ${o}`),
    join(arrow),
    split(''),
  )(i)}`
}

export const validateIO = function validateIO(inputSpecs, outputSpecs = '*') {
  return fn => {
    return curryN(fn.length)((...args) => {
      try {
        validate(inputSpecs, args)
      } catch (e) {
        console.debug(args, e)
        throw new Error(
          `[IN] ${fn.name} :: ${specsToSignature(inputSpecs, outputSpecs)} \n ${
            e.message
          }`,
        )
      }
      try {
        const result = fn(...args)
        validate(outputSpecs, [result])
        return result
      } catch (e) {
        console.debug(args, e)
        throw new Error(
          `[OUT] ${fn.name} :: ${specsToSignature(
            inputSpecs,
            outputSpecs,
          )} \n ${e.message}`,
        )
      }
    })
  }
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

export const findIdByClampedIdx = validateIO('NA', 'S')((idx, list) => {
  return pathS([clampIdx(idx)(list), 'id'])(list).l
})
export const clampIdx = validateIO('NA', 'N')(
  (idx, list) => (isEmpty(list) ? NaN : clamp(0, list.length - 1)(idx)),
)

export const mapA = validateIO('FA')(map)

export const mapIndexedA = validateIO('FA')(mapA)
//validateIO('S|Z', 'F')
export const tapLog = msg => tap(partial(console.log)([msg]))
export const atClampedIdx = validateIO('NA')(function atClampedIdx(idx, list) {
  return path([clampIdx(idx)(list)])(list)
})
