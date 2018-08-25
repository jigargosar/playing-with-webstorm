import { curry, findIndex, lensIndex, over, propEq } from 'ramda'
import { assert } from '../lib/assert'

export const overModel = curry(({ id }, fn, list) => {
  return overModelId(id, fn, list)
})

export const overModelId = curry(({ id }, fn, list) => {
  const taskIdx = findIndex(propEq('id', id))(list)
  assert(taskIdx !== -1)
  return over(lensIndex(taskIdx), fn, list)
})

export const findById = id => find(propEq('id', id))
