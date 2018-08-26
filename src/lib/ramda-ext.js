import {
  find,
  findIndex,
  lensIndex,
  lensProp,
  over,
  propEq,
} from 'ramda'
import { vNot } from './ramda-safe'

const findIndexById = id => findIndex(propEq('id', id))

export const overModelWithId = id => fn => list => {
  const idx = findIndexById(id)(list)
  debugger
  return over(lensIndex(idx))(fn)(list)
}

export const findById = id => find(propEq('id', id))

export const overProp = propName => over(lensProp(propName))

export const toggleProp = propName => overProp(propName)(vNot)
