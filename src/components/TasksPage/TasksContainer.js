import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'constate'
import {
  createSampleTaskList,
  flattenTasksFromGroups,
  getTaskGroupsForTab,
} from '../../models'
import path from 'ramda/es/path'
import { compose } from 'ramda'
import { clampIdx, validateIO } from '../../lib/ramda-strict'
import { findIndexById } from '../../lib/ramda-ext'

const initialState = {
  taskCollection: createSampleTaskList(),
  selectedTaskIdx: 0,
}

const getTaskGroups = () => getTaskGroupsForTabId('in_basket')

const getTaskGroupsForTabId = tabId => state =>
  getTaskGroupsForTab(tabId, getTaskCollection()(state))

export const atClampedIdx = validateIO('NA')(function atClampedIdx(idx, list) {
  return path([clampIdx(idx)(list)])(list)
})

const getSelectedTask = () => state => {
  const currentTaskList = getCurrentTaskList()(state)
  return atClampedIdx(state.selectedTaskIdx, currentTaskList)
}

const isTaskSelected = task => state => getSelectedTask()(state) === task

const getTaskCollection = () => path(['taskCollection'])

const getCurrentTaskList = () =>
  compose(
    flattenTasksFromGroups,
    getTaskGroups(),
  )

const setSelectedTask = ({ id }) => state => {
  return {
    selectedTaskIdx: findIndexById(id)(getCurrentTaskList()(state)),
  }
}

const selectors = {
  getTaskGroupsForTabId,
  isTaskSelected,
}

const actions = {
  setSelectedTask,
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
