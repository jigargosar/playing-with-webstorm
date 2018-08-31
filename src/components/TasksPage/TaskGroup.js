import { composeHOC } from '../composeHOC'
import { Flex, Heading } from 'reakit'
import { Keyed } from '../../shared-components/Keyed'
import * as PropTypes from 'prop-types'
import React from 'react'

export const TaskGroup = composeHOC()(function TaskGroup({
  group: { title, tasks },
  showContext,
  taskComponent: Task,
}) {
  return (
    <div className="center measure mv3">
      <div className="pa3 br3 bg-white shadow-1 ">
        <Flex marginBottom={'1rem'} as={[Heading, 'h3']}>
          {title}
        </Flex>
        <Keyed
          list={tasks}
          as={Task}
          getProps={task => ({ task })}
          showContext={showContext}
        />
      </div>
    </div>
  )
})

TaskGroup.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
  }).isRequired,
  showContext: PropTypes.bool,
  taskComponent: PropTypes.func.isRequired,
}

TaskGroup.defaultProps = {
  showContext: true,
}
