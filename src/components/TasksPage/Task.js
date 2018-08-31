import * as PropTypes from 'prop-types'
import React from 'react'
import { tap } from 'ramda'
import { composeHOC } from '../composeHOC'
import { Group, Hidden } from 'reakit'
import { Task as StyledTask } from './elements/Task'

import cn from 'classname'
import { Button, FlexCenter, FlexColumn } from '../../reakit-components'

const linkEvent = (fn, ...args) => tap(e => fn(...args, e))

export const Task = composeHOC()(function Task({
  task,
  mouseEnterTask,
  isTaskSelected,
  isTaskHovered,
  mouseLeaveTask,
  selectTask,
  toggleSelectedTaskDone,
  toggleTaskDone,
  deleteTask,
}) {
  const hovered = isTaskHovered(task)
  return (
    <StyledTask
      selected={isTaskSelected(task)}
      hovered={hovered}
      onMouseEnter={linkEvent(mouseEnterTask, task)}
      onMouseLeave={linkEvent(mouseLeaveTask, task)}
      onClickCapture={linkEvent(selectTask, task)}
    >
      <FlexCenter relative>
        <Hidden visible={hovered} absolute zIndex={1} right={'-4rem'}>
          <Group vertical relative className="pa2 bg-white-90 br3 shadow-1">
            <Button onClick={linkEvent(toggleTaskDone, task)}>{'Done'}</Button>
            <Button onClick={linkEvent(deleteTask, task)}>{'Delete'}</Button>
          </Group>
        </Hidden>

        <FlexColumn>
          <div className={cn('ph2', { strike: task.done })}>{task.title}</div>
          <small className={'ttu f7 ph2'}>{`@${task.context.title}`}</small>
        </FlexColumn>
      </FlexCenter>
    </StyledTask>
  )
})
Task.propTypes = {
  task: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  isTaskSelected: PropTypes.func.isRequired,
  isTaskHovered: PropTypes.func.isRequired,
  mouseEnterTask: PropTypes.func.isRequired,
  mouseLeaveTask: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
  toggleTaskDone: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}
