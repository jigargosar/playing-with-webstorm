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

const taskCollectionFromState = path(['taskCollection'])
const taskGroupsFromState = state =>
  getTaskGroupsForTab(state.currentTabId, taskCollectionFromState(state))

const currentTaskListFromState = compose(
  flattenGroupTasks,
  taskGroupsFromState,
)
const selectedTaskFromState = state => {
  const selectedTaskIdx = clampIdx(state.selectedTaskIdx)(
    currentTaskListFromState(state),
  )
  return compose(
    path([selectedTaskIdx]),
    currentTaskListFromState,
  )(state)
}
const selectors = {
  getTaskGroups: () => taskGroupsFromState,
  getSelectedTask: () => selectedTaskFromState,
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
