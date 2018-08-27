import React from 'react'
import { ScrollContainer, ViewportHeightContainer } from './containers'
import { compose } from 'ramda'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import { withMouseOverHandlers } from './withMouseOverHandlers'
import { injectState, withAppState, withIndexState } from './withFreactal'

function FloatingActionsContainer({ children }) {
  return (
    <div
      className="absolute z-1  flex items-center "
      style={{ right: '0.5rem' }}
    >
      <div className="absolute ">
        <div className="pa2 bg-white-80 br3 shadow-1">{children}</div>
      </div>
    </div>
  )
}

function renderButton(content, clickHandler) {
  return (
    <div
      className="ma1 pv1 ph1 orange pointer no-select code "
      onClick={clickHandler}
    >
      {content}
    </div>
  )
}

const enhanceTask = compose(
  withMouseOverHandlers,
  injectState,
)
const Task = enhanceTask(function Task({
  task: { id, title, done },
  selected,
  handleSelectTask,
  dispatch,
  effects,
  handleMouseEnter,
  handleMouseLeave,
  mouseOver,
}) {
  // const handleToggleDone = () => dispatch({ type: 'task.toggleDone', id })
  return (
    <div
      className={cn(
        'mv2 flex items-center relative',
        mouseOver || selected ? 'yellow' : 'white',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {mouseOver && (
        <FloatingActionsContainer>
          {renderButton('Done', () => effects.toggleTaskDone(id))}
          {/*{renderButton('Schedule')}*/}
          {renderButton('Delete', () => effects.deleteTask(id))}
        </FloatingActionsContainer>
      )}
      <div
        className="flex-auto pa2 f5 bg-light-purple br2 "
        onClick={handleSelectTask}
      >
        <div className={cn({ strike: done })}>{title}</div>
      </div>
    </div>
  )
})
Task.propTypes = { task: PropTypes.object.isRequired }

const enhanceTaskList = compose(
  withIndexState('selectedIdx'),
  injectState,
)
const TaskList = enhanceTaskList(function TaskList({
  state: { tasks, selectedIdx },
  effects,
}) {
  return (
    <div className="center measure-wide">
      <div className="ma3 pa3 br3 bg-white shadow-1 ">
        <div className="">Tasks</div>
        <Models models={tasks}>
          {(task, idx) => (
            <Task
              task={task}
              selected={selectedIdx === idx}
              handleSelectTask={() => effects.setIndex(idx)}
            />
          )}
        </Models>
      </div>
    </div>
  )
})
TaskList.propTypes = {
  // tasks: PropTypes.array.isRequired,
}

const enhancePage = compose(
  withAppState,
  // injectState,
)
export const Page =
  //
  enhancePage(function Page() {
    return (
      <ViewportHeightContainer className="bg-light-gray">
        <div className="pa3 shadow-1">STATIC HEADER</div>
        <ScrollContainer>
          <TaskList />
        </ScrollContainer>
        <div className="pa3 shadow-1">STATIC FOOTER</div>
      </ViewportHeightContainer>
    )
  })
