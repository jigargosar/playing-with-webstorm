import { curry, findIndex, lensIndex, over, propEq } from 'ramda'

const findIndexById = id => findIndex(propEq('id', id))

export const overItemById = curry((id, fn, list) =>
  over(lensIndex(findIndexById(id)(list)))(fn)(list),
)
