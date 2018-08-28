import { createNewTaskWithDefaults } from '../models/Task'
import { clamp, isEmpty, prop, times } from 'ramda'
import { findIndexById } from '../lib/ramda-ext'
import { xRemoveAt, xToggleProp } from './xUtils'
import * as xu from 'mobx-utils'
import * as x from 'mobx'

export const expr = xu.expr
// export const expr = fn => x.computed(fn).get()

const state = x.observable.object(
  {
    tasks: times(createNewTaskWithDefaults)(16),
    sIdx: 0,
  },
  {},
  { name: 'state' },
)
export const tasks = () => expr(() => state.tasks)
const sIdx = () => expr(() => state.sIdx)

const clampedSIdx = () =>
  expr(() => (isEmpty(tasks()) ? NaN : clamp(0, tasks().length - 1)(sIdx())))
const sTask = () => expr(() => tasks()[clampedSIdx()])
export const sId = () => expr(() => prop('id')(sTask))

const setSIdx = idx => (state.sIdx = idx)

export const handleSelectTask = id => () => setSIdx(findIndexById(id)(tasks()))
export const handleSelectedTaskToggleDone = () => xToggleProp('done', sTask())
export const handleSelectedTaskDelete = () => xRemoveAt(clampedSIdx(), tasks())
