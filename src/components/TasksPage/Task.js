import * as PropTypes from 'prop-types'
import React from 'react'
import { tap } from 'ramda'
import { composeHOC } from '../composeHOC'
import { Base, Group } from 'reakit'
import cn from 'classname'
import {
  Button,
  FlexCenter,
  primaryLight,
  secondaryDark,
} from '../../reakit-components'

const linkEvent = (fn, ...args) => tap(e => fn(...args, e))
export const FloatingActionsContainer = composeHOC()(
  function FloatingActionsContainer({ children }) {
    return (
      <div
        className={'absolute z-1 flex items-center'}
        style={{ right: '2rem' }}
      >
        <div className="absolute ">
          <div className="pa2 bg-white-80 br3 shadow-1">{children}</div>
        </div>
      </div>
    )
  },
)
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
  const selected = isTaskSelected(task)
  const hovered = isTaskHovered(task)
  return (
    <Base
      className={cn('mv2 pv2 br2')}
      {...(selected
        ? { color: '#fff', backgroundColor: secondaryDark }
        : hovered
          ? { backgroundColor: primaryLight }
          : {})}
      onMouseEnter={linkEvent(mouseEnterTask, task)}
      onMouseLeave={linkEvent(mouseLeaveTask, task)}
      onClickCapture={linkEvent(selectTask, task)}
    >
      <FlexCenter relative>
        {hovered && (
          <FloatingActionsContainer>
            <Group vertical>
              <Button onClick={linkEvent(toggleTaskDone, task)}>
                {'Done'}
              </Button>
              <Button onClick={linkEvent(deleteTask, task)}>{'Delete'}</Button>
            </Group>
          </FloatingActionsContainer>
        )}
        <div className={cn('flex-auto ph2', { strike: task.done })}>
          {task.title}
        </div>
      </FlexCenter>
      <small className={'ttu f7 ph2'}>{`@${task.context.title}`}</small>
    </Base>
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
