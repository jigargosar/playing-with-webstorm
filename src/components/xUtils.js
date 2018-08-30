import { computed } from 'mobx'
import { curry, curryN } from 'ramda'
import dset from 'dset'
import dget from 'dlv'
import { validate } from '../lib/validate'
import { findById, findIndexById } from '../lib/ramda-ext'

export const xToggleProp = curry((p, obj) => (obj[p] = !obj[p]))

export const xTogglePropById = curry((p, id, list) =>
  xToggleProp(p, findById(id)(list)),
)

export const xRemoveAt = curry((idx, list) => {
  validate('NA', [idx, list])
  return list.splice(idx, 1)
})

export const xRemoveById = curry((id, list) =>
  xRemoveAt(findIndexById(id)(list))(list),
)
export const xSet = curryN(3, dset)
export const xGet = curryN(2, dget)
export const xGetOr = curryN(3, dget)
export const computedFn = fn => () => computed(fn).get()
