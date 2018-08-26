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

export const idEq = propEq('id')

export const findById = compose(
  find,
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

  return overIndex(idx)(fn)(list)
}

export const overProp = propName => over(lensProp(propName))

export const toggleProp = propName => overProp(propName)(vNot)
