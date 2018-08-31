import * as PropTypes from 'prop-types'
import React from 'react'
import { tap } from 'ramda'
import { composeHOC } from '../composeHOC'
import { TaskActionsGroup, TaskItem } from './elements/TaskItem'
import cn from 'classname'
import { Button } from '../../reakit-components'
import { Fit } from 'reakit'

const linkEvent = (fn, ...args) => tap(e => fn(...args, e))

const backgroundColor = 'rgba(1,1,1,0.2)'

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
  return (
    <TaskItem
      relative
      selected={isTaskSelected(task)}
      onClickCapture={linkEvent(selectTask, task)}
    >
      <Fit
        style={{
          backgroundColor: backgroundColor,
          zIndex: 5,
          left: 'calc( 100% - 5rem)',
          top: '-50%',
        }}
      >
        <TaskActionsGroup>
          <Button onClick={linkEvent(toggleTaskDone, task)}>{'Done'}</Button>
          <Button onClick={linkEvent(deleteTask, task)}>{'Delete'}</Button>
        </TaskActionsGroup>
      </Fit>
      <div className={cn('ph2', { strike: task.done })}>{task.title}</div>
      <small className={'ttu f7 ph2'}>{`@${task.context.title}`}</small>
    </TaskItem>
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
