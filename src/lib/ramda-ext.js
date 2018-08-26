import {
  curry,
  find,
  findIndex,
  lensIndex,
  over,
  propEq,
} from 'ramda'
import { assert } from './assert'

const findIndexById = id => findIndex(propEq('id', id))

export const overItemById = curry((id, fn, list) =>
  over(lensIndex(findIndexById(id)(list)))(fn)(list),
)
export const overModel = curry(({ id }, fn, list) => {
  const taskIdx = findIndex(propEq('id', id))(list)
  assert(taskIdx !== -1)
  return over(lensIndex(taskIdx), fn, list)
})
export const findById = id => find(propEq('id', id))
