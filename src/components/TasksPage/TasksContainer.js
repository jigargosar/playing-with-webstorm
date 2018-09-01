import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'constate'
import { createSampleTaskList, getTaskGroupsForTab } from '../../models'
import path from 'ramda/es/path'
import { __, always, concat } from 'ramda'
import { clampIdx, validateIO } from '../../lib/ramda-strict'

const initialState = {
  taskCollection: createSampleTaskList(),
}

const getTaskGroupsForTabId = tabId => state =>
  getTaskGroupsForTab(tabId, getTaskCollection()(state))

export const atClampedIdx = validateIO('NA')(function atClampedIdx(idx, list) {
  return path([clampIdx(idx)(list)])(list)
})

const getTaskCollection = () => path(['taskCollection'])

const deleteAllTasks = () => always({ taskCollection: [] })
const addMoreTasks = () => ({ taskCollection }) => ({
  taskCollection: concat(__, createSampleTaskList()),
})

const selectors = {
  getTaskGroupsForTabId,
}

const actions = {
  deleteAllTasks,
  addMoreTasks,
}

export const TasksContainer = props => (
  <Container
    {...props}
    initialState={{
      ...initialState,
    }}
    selectors={{ ...selectors, ...props.selectors }}
    actions={{ ...actions, ...props.actions }}
  />
)

TasksContainer.propTypes = {
  initialState: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
  selectors: PropTypes.objectOf(PropTypes.func),
}
