import { curry, findIndex, lensIndex, over, propEq } from 'ramda'
import { assert } from '../lib/assert'

export const overModel = curry(({ id }, fn, list) => {
  const taskIdx = findIndex(propEq('id', id))(list)
  assert(taskIdx !== -1)
  return over(lensIndex(taskIdx), fn, list)
})
