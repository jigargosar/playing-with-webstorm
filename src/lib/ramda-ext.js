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

const idEq = propEq('id')

export const findById = compose(
  find,
  idEq,
)

export const findIndexById =
  //
  compose(
    findIndex,
    idEq,
  )

export const overModelWithId = (id) => (fn) => (list) => {
  const idx = findIndexById(id)(list)

  return over(lensIndex(idx))(fn)(list)
}

export const overProp = (propName) => over(lensProp(propName))

export const toggleProp = (propName) => overProp(propName)(vNot)
