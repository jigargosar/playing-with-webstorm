import {
  clamp,
  compose,
  find,
  findIndex,
  isEmpty,
  lensIndex,
  lensProp,
  over,
  propEq,
  reject,
} from 'ramda'
import { vNot } from './ramda-strict'
import { assert } from './assert'

export const idEq = propEq('id')

export const findById = compose(
  find,
  idEq,
)

export const rejectById = compose(
  reject,
  idEq,
)

export const findIndexById = compose(
  findIndex,
  idEq,
)

const overIndex = compose(
  over,
  lensIndex,
)

export const overModelWithId = id => fn => list => {
  const idx = findIndexById(id)(list)
  assert(idx !== -1)
  return overIndex(idx)(fn)(list)
}

export const overProp = propName => over(lensProp(propName))

export const toggleProp = propName => overProp(propName)(vNot)

export const overItemInListWithId = id => fn => cName =>
  overProp(cName)(overModelWithId(id)(fn))

// export const overFst = overIndex(0)
// export const overSnd = overIndex(1)
//
// export const mapOverNth = n => fn => map(overIndex(n)(fn))
// export const mapOverFst = mapOverNth(0)
// export const mapOverSnd = mapOverNth(1)
export const clampIdx = idx => list =>
  isEmpty(list) ? NaN : clamp(0, list.length - 1)(idx)
