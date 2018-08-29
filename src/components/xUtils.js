import { computed } from 'mobx'
import { curry, curryN } from 'ramda'
import dset from 'dset'
import dget from 'dlv'
import { validate } from '../lib/validate'
import { findIndexById } from '../lib/ramda-ext'

export const xToggleProp = curry((p, task) => (task[p] = !task[p]))

export const xRemoveAt = curry((idx, list) => {
  validate('NA', [idx, list])
  return list.splice(idx, 1)
})

const xRemoveById = curry((id, list) =>
  xRemoveAt(findIndexById(id)(list))(list),
)
export const xSet = curryN(3, dset)
export const xGet = curryN(2, dget)
export const xGetOr = curryN(3, dget)
export const xComputedFn = fn => () => computed(fn).get()
