import { clamp, compose, find, findIndex, isEmpty, propEq, reject } from 'ramda'

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
