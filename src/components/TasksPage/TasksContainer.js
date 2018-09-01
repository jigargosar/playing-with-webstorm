import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'constate'
import { createSampleTaskList, getTaskGroupsForTab } from '../../models'
import path from 'ramda/es/path'
import { always, concat, lensProp, over } from 'ramda'
import { validateIO } from '../../lib/ramda-strict'
import { overElById, removeById, toggleProp } from '../../lib/ramda-ext'

const initialState = {
  taskCollection: createSampleTaskList(),
}

const getTaskGroupsForTabId = tabId => state =>
  getTaskGroupsForTab(tabId, getTaskCollection()(state))
const getTaskCollection = () => path(['taskCollection'])

const overTasksCollection = over(lensProp('taskCollection'))

const toggleTaskDone = task =>
  overTasksCollection(overElById(task)(toggleProp('done')))
const deleteTask = task => overTasksCollection(removeById(task))
const deleteAllTasks = () => always({ taskCollection: [] })
const addMoreTasks = () =>
  validateIO('O', 'O')(overTasksCollection(concat(createSampleTaskList())))

const selectors = {
  getTaskGroupsForTabId,
}
const actions = {
  deleteAllTasks,
  addMoreTasks,
  toggleTaskDone,
  deleteTask,
}
export const TasksContainer = props => (
  <Container
    {...props}
    initialState={{ ...initialState }}
    selectors={{ ...selectors, ...props.selectors }}
    actions={{ ...actions, ...props.actions }}
  />
)
TasksContainer.propTypes = {
  initialState: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
  selectors: PropTypes.objectOf(PropTypes.func),
}
