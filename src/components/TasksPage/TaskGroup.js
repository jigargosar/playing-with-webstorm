import { composeHOC } from '../composeHOC'
import { Heading, styled } from 'reakit'
import * as PropTypes from 'prop-types'
import React from 'react'
import { map } from 'ramda'
import { Task } from './Task'

const TaskGroupTitle = styled(Heading).attrs({ as: 'h3' })`
  margin-bottom: 1rem;
`

export const TaskGroup = composeHOC()(function TaskGroup({
  group: { title, tasks },
  taskProps,
}) {
  return (
    <div className="center measure mv3 pa3 br3 bg-white shadow-1 ">
      <TaskGroupTitle>{title}</TaskGroupTitle>
      {map(task => (
        <Task key={`{title}--${task.id}`} task={task} {...taskProps} />
      ))(tasks)}
    </div>
  )
})

TaskGroup.propTypes = {
  group: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
  }).isRequired,
  taskProps: PropTypes.object.isRequired,
}

TaskGroup.defaultProps = {}
