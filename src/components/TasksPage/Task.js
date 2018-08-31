import * as PropTypes from 'prop-types'
import React from 'react'
import { tap } from 'ramda'
import { composeHOC } from '../composeHOC'
import {
  TaskHoverActions,
  TaskHoverActionsContent,
  TaskItem,
} from './elements/TaskItem'
import cn from 'classname'
import { Button } from '../../reakit-components'

const linkEvent = (fn, ...args) => tap(e => fn(...args, e))

export const Task = composeHOC()(function Task(props) {
  const { task, isTaskSelected, selectTask, toggleTaskDone, deleteTask } = props
  return (
    <TaskItem
      selected={isTaskSelected(task)}
      onClickCapture={linkEvent(selectTask, task)}
    >
      <TaskHoverActions>
        <TaskHoverActionsContent>
          <Button onClick={linkEvent(toggleTaskDone, task)}>{'Done'}</Button>
          <Button onClick={linkEvent(deleteTask, task)}>{'Delete'}</Button>
        </TaskHoverActionsContent>
      </TaskHoverActions>
      <div className={cn('ph2', { strike: task.done })}>{task.title}</div>
      <small className={'ttu f7 ph2'}>{`@${task.context.title}`}</small>
    </TaskItem>
  )
})

Task.propTypes = {
  task: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  isTaskSelected: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
  toggleTaskDone: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}
