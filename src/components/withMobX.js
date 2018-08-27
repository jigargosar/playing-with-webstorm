import * as x from 'mobx'
import * as mobXReact from 'mobx-react'
import { createNewTaskWithDefaults } from '../models/Task'
import { clamp, isEmpty, prop, times } from 'ramda'
import { findIndexById } from '../lib/ramda-ext'
import { xRemoveAt, xToggleProp } from './xUtils'

const xr = mobXReact
export { xr }

const computedFn = cfn => x.computed(cfn).get()

export const state = x.observable.object(
  {
    tasks: times(createNewTaskWithDefaults)(16),
    sIdx: 0,
  },
  {},
  { name: 'state' },
)
const tasks = () => x.computed(() => state.tasks).get()
const sIdx = () => x.computed(() => state.sIdx).get()

const clampedSIdx = computedFn(
  () => (isEmpty(tasks()) ? NaN : clamp(0, tasks().length - 1)(sIdx())),
)
const sTask = () => x.computed(() => state.tasks[clampedSIdx()]).get()
export const sId = () => x.computed(() => prop('id')(sTask)).get()

const setSIdx = idx => (state.sIdx = idx)

export const handleSelectTask = id => () => setSIdx(findIndexById(id)(tasks()))
export const handleSelectedTaskToggleDone = () => xToggleProp('done', sTask())
export const handleSelectedTaskDelete = () => xRemoveAt(clampedSIdx(), tasks())
