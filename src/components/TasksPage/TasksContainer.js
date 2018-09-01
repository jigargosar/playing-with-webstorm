import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'constate'
import { createSampleTaskList, getTaskGroupsForTab } from '../../models'
import path from 'ramda/es/path'
import { always, concat, lensProp, over } from 'ramda'
import { validateIO } from '../../lib/ramda-strict'

const initialState = {
  taskCollection: createSampleTaskList(),
}

const getTaskGroupsForTabId = tabId => state =>
  getTaskGroupsForTab(tabId, getTaskCollection()(state))
const getTaskCollection = () => path(['taskCollection'])

const deleteAllTasks = () => always({ taskCollection: [] })
const addMoreTasks = () =>
  validateIO('O', 'O')(
    over(lensProp('taskCollection'))(concat(createSampleTaskList())),
  )

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
