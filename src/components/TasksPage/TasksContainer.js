import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'constate'
import { createSampleTaskList } from '../../models'

const initialState = {
  taskCollection: createSampleTaskList(),
  selectedTaskIdx: 0,
}

export const TasksContainer = ({ tabsProps, ...otherProps }) => (
  <Container {...otherProps} initialState={initialState} />
)

TasksContainer.propTypes = {
  initialState: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
  selectors: PropTypes.objectOf(PropTypes.func),
}
