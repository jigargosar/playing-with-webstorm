import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'constate'
import { createRandomTaskList, getTaskGroupsForTab } from '../../models'
import path from 'ramda/es/path'
import { always, concat } from 'ramda'
import { validateIO } from '../../lib/ramda-strict'
import {
  overElById,
  overProp,
  removeById,
  toggleProp,
} from '../../lib/ramda-ext'

const initialState = {
  taskCollection: createRandomTaskList(),
}

const getTaskGroupsForTabId = tabId => state =>
  getTaskGroupsForTab(tabId, getTaskCollection()(state))
const getTaskCollection = () => path(['taskCollection'])

const overTasks = overProp('taskCollection')

const toggleTaskDone = task => overTasks(overElById(task)(toggleProp('done')))
const deleteTask = task => overTasks(removeById(task))
const deleteAllTasks = () => always({ taskCollection: [] })
const addMoreTasks = () =>
  validateIO('O', 'O')(overTasks(concat(createRandomTaskList())))

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
