import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'constate'
import {
  createSampleTaskList,
  flattenGroupTasks,
  getTaskGroupsForTab,
} from '../../models'
import path from 'ramda/es/path'
import { compose } from 'ramda'
import { clampIdx } from '../../lib/ramda-strict'

const initialState = {
  taskCollection: createSampleTaskList(),
  selectedTaskIdx: 0,
}

const getTaskGroups = () => state =>
  getTaskGroupsForTab(state.currentTabId, getTaskCollection()(state))

const getSelectedTask = () => selectedTaskFromState

const getTaskCollection = () => path(['taskCollection'])

const getCurrentTaskList = () =>
  compose(
    flattenGroupTasks,
    getTaskGroups(),
  )

const selectedTaskFromState = state => {
  const currentTaskList = getCurrentTaskList()(state)
  const selectedTaskIdx = clampIdx(state.selectedTaskIdx)(currentTaskList)
  return path([selectedTaskIdx])(currentTaskList)
}

const selectors = {
  getTaskGroups,
  getSelectedTask,
}
export const TasksContainer = props => (
  <Container
    {...props}
    initialState={{
      ...initialState,
      currentTabId: props.tabProps.getCurrentId(),
      tabProps: props.tabProps,
    }}
    selectors={{ ...selectors, ...props.selectors }}
  />
)

TasksContainer.propTypes = {
  initialState: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
  selectors: PropTypes.objectOf(PropTypes.func),
}
