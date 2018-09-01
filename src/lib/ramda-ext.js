import {
  clamp,
  compose,
  find,
  findIndex,
  isEmpty,
  lensIndex,
  over,
  propEq,
  reject,
} from 'ramda'
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

export const clampIdx = idx => list =>
  isEmpty(list) ? NaN : clamp(0, list.length - 1)(idx)

export const overElById = ({ id }) => fn => list => {
  const idx = findIndexById(id)(list)
  assert(idx >= 0)
  return over(lensIndex(idx))(fn)(list)
}
