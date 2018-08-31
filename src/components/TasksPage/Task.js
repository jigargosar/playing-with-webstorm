import * as PropTypes from 'prop-types'
import React from 'react'
import { tap } from 'ramda'
import { composeHOC } from '../composeHOC'
import { Base } from 'reakit'
import cn from 'classname'
import {
  FlexCenter,
  primaryLight,
  secondaryDark,
} from '../../reakit-components'
import { Btn } from '../Btn'

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
  deleteSelectedTask,
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
            <Btn onClick={linkEvent(toggleTaskDone, task)}>{'Done'}</Btn>
            <Btn onClick={deleteSelectedTask}>{'Delete'}</Btn>
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
  toggleSelectedTaskDone: PropTypes.func.isRequired,
  toggleTaskDone: PropTypes.func.isRequired,
  deleteSelectedTask: PropTypes.func.isRequired,
}
