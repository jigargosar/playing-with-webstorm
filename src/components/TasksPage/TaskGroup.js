import { composeHOC } from '../composeHOC'
import { Base, Heading, styled } from 'reakit'
import * as PropTypes from 'prop-types'
import React from 'react'
import { map } from 'ramda'
import { Task } from './Task'

export const GroupCardTitle = styled(Heading).attrs({ as: 'h3' })`
  margin-bottom: 1rem;
`

export const GroupCard = styled(Base).attrs({
  className: 'center measure mv3 pa3 br3 bg-white shadow-1 ',
})``

export const TaskGroup = composeHOC()(function TaskGroup({
  group: { title, tasks },
  taskProps,
}) {
  return (
    <GroupCard>
      <GroupCardTitle>{title}</GroupCardTitle>
      {map(task => (
        <Task key={`{title}--${task.id}`} task={task} {...taskProps} />
      ))(tasks)}
    </GroupCard>
  )
})

TaskGroup.propTypes = {
  group: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
  }).isRequired,
  taskProps: PropTypes.object.isRequired,
}

TaskGroup.defaultProps = {
  group: { title: 'GROUP_TITLE', tasks: [] },
  taskProps: {},
}
