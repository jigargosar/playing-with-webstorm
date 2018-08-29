import { computed } from 'mobx'
import { curry, curryN } from 'ramda'
import dset from 'dset'
import dget from 'dlv'

export const xToggleProp = curry((p, task) => (task[p] = !task[p]))

export const xRemoveAt = curry((idx, list) => list.splice(idx, 1))

export const xSet = curryN(3, dset)
export const xGet = curryN(2, dget)
export const xGetOr = curryN(3, dget)
export const xComputedFn = fn => () => computed(fn).get()
