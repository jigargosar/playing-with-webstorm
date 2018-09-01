import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'constate'
import {
  createSampleTaskList,
  flattenTasksFromGroups,
  getTaskGroupsForTab,
} from '../../models'
import path from 'ramda/es/path'
import { compose, prop } from 'ramda'
import { clampIdx, propS } from '../../lib/ramda-strict'

const initialState = {
  taskCollection: createSampleTaskList(),
  selectedTaskIdx: 0,
}
const getCurrentTabId = () => propS('currentTabId')
const getTaskGroups = () => state =>
  getTaskGroupsForTab(getCurrentTabId()(state), getTaskCollection()(state))

const getSelectedTask = () => state => {
  const currentTaskList = getCurrentTaskList()(state)
  const selectedTaskIdx = clampIdx(state.selectedTaskIdx)(currentTaskList)
  return path([selectedTaskIdx])(currentTaskList)
}

const getTaskCollection = () => path(['taskCollection'])

const getCurrentTaskList = () =>
  compose(
    flattenTasksFromGroups,
    getTaskGroups(),
  )
const getTabProps = () => prop('tabProps')

const selectors = {
  getTaskGroups,
  getSelectedTask,
  getCurrentTabId,
  getTabProps,
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
