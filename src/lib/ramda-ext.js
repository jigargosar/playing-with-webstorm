import {
  find,
  findIndex,
  lensIndex,
  lensProp,
  over,
  propEq,
} from 'ramda'
import { vNot } from './ramda-safe'

const findIndexById = findIndex(propEq('id'))

export const overModelWithId = id => fn => list =>
  over(lensIndex(findIndexById(id)(list)))(fn)(list)

export const findById = find(propEq('id'))

export const overProp = propName => over(lensProp(propName))

export const toggleProp = propName => overProp(propName)(vNot)
