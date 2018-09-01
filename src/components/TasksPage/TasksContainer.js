import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'constate'
import { createSampleTaskList, getTaskGroupsForTab } from '../../models'
import path from 'ramda/es/path'
import { always, concat } from 'ramda'

const initialState = {
  taskCollection: createSampleTaskList(),
}

const getTaskGroupsForTabId = tabId => state =>
  getTaskGroupsForTab(tabId, getTaskCollection()(state))
const getTaskCollection = () => path(['taskCollection'])

const deleteAllTasks = () => always({ taskCollection: [] })
const addMoreTasks = () => ({ taskCollection }) => ({
  taskCollection: concat(createSampleTaskList(), taskCollection),
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
