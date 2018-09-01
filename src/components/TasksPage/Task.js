import * as PropTypes from 'prop-types'
import React from 'react'
import { tap } from 'ramda'
import {
  TaskHoverActions,
  TaskHoverActionsContent,
  TaskItem,
} from './elements/TaskItem'
import cn from 'classname'
import { Button } from '../../reakit-components'

const linkEvent = (fn, ...args) => tap(e => fn(...args, e))

export function Task(props) {
  const { task, selected, selectTask, toggleTaskDone, deleteTask } = props
  return (
    <TaskItem selected={selected} onClick={linkEvent(selectTask, task)}>
      <TaskHoverActions>
        <TaskHoverActionsContent>
          <Button onClick={linkEvent(toggleTaskDone, task)}>{'Done'}</Button>
          <Button onClick={linkEvent(deleteTask, task)}>{'Delete'}</Button>
        </TaskHoverActionsContent>
      </TaskHoverActions>
      <div className={cn('mh2', { strike: task.done })}>{task.title}</div>
      <small className={'ttu f7 mh2'}>{`@${task.group.title}`}</small>
    </TaskItem>
  )
}

Task.propTypes = {
  task: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  selected: PropTypes.bool.isRequired,
  selectTask: PropTypes.func.isRequired,
  toggleTaskDone: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}
