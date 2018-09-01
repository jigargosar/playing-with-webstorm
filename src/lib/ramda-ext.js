import {
  clamp,
  compose,
  find,
  findIndex,
  isEmpty,
  lensIndex,
  lensProp,
  not,
  over,
  propEq,
  reject,
  remove,
} from 'ramda'
import { assert } from './assert'
import { validate } from './validate'

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
  validate('SFA', [id, fn, list])
  const idx = findIndexById(id)(list)
  assert(idx >= 0)
  return over(lensIndex(idx))(fn)(list)
}

export const removeById = ({ id }) => list => {
  validate('SA', [id, list])
  const idx = findIndexById(id)(list)
  assert(idx >= 0)
  return remove(idx)(1)(list)
}
export const overProp = p => over(lensProp(p))
export const toggleProp = p => overProp(p)(not)
