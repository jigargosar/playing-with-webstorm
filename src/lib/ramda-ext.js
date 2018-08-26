import {
  curry,
  find,
  findIndex,
  lensIndex,
  lensProp,
  over,
  propEq,
} from 'ramda'
import { vNot } from './ramda-safe'

const findIndexById = id => findIndex(propEq('id', id))

export const overItemById = curry((id, fn, list) =>
  over(lensIndex(findIndexById(id)(list)))(fn)(list),
)

export const findById = id => find(propEq('id', id))

export const overProp = propName => over(lensProp(propName))

export const toggleProp = propName => overProp(propName)(vNot)
