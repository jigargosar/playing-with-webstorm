import {
  compose,
  find,
  findIndex,
  lensIndex,
  lensProp,
  over,
  propEq,
} from 'ramda'
import { vNot } from './ramda-safe'

export const findIndexById = compose(
  findIndex,
  propEq('id'),
)

export const overModelWithId = id => fn => list => {
  const idx = findIndexById(id)(list)

  return over(lensIndex(idx))(fn)(list)
}

export const findById = id => find(propEq('id', id))

export const overProp = propName => over(lensProp(propName))

export const toggleProp = propName => overProp(propName)(vNot)
