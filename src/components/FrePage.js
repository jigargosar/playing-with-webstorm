import React from 'react'
import { ScrollContainer, ViewportHeightContainer } from './containers'
import { withStateHandlers } from 'recompose'
import { compose } from 'ramda'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import { withMouseOverHandlers } from './withMouseOverHandlers'
import { injectState, wrapComponentWithState } from './withFreactal'

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

const enhanceTask = compose(withMouseOverHandlers)
const Task = enhanceTask(function Task({
  task: { id, title, done },
  selected,
  dispatch,
  handleMouseEnter,
  handleMouseLeave,
  mouseOver,
}) {
  const handleToggleDone = () => dispatch({ type: 'task.toggleDone', id })
  const handleDelete = () => dispatch({ type: 'task.delete', id })
  const handleSelect = () => dispatch({ type: 'task.select', id })
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
          {renderButton('Done', handleToggleDone)}
          {/*{renderButton('Schedule')}*/}
          {renderButton('Delete', handleDelete)}
        </FloatingActionsContainer>
      )}
      <div
        className="flex-auto pa2 f5 bg-light-purple br2 "
        onClick={handleSelect}
      >
        <div className={cn({ strike: done })}>{title}</div>
      </div>
    </div>
  )
})
Task.propTypes = { task: PropTypes.object.isRequired }

const enhanceTaskList = compose(withStateHandlers({ index: 0 }))
const TaskList = enhanceTaskList(function TaskList({
  tasks,
  dispatch,
  index: selectedIndex,
}) {
  return (
    <div className="center measure-wide">
      <div className="ma3 pa3 br3 bg-white shadow-1 ">
        <div className="">Tasks</div>
        <Models models={tasks}>
          {(task, index) => (
            <Task
              task={task}
              selected={index === selectedIndex}
              dispatch={dispatch}
            />
          )}
        </Models>
      </div>
    </div>
  )
})
TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const enhancePage = compose(
  // withStateReducer(),
  wrapComponentWithState,
  injectState,
)
export const Page =
  //
  enhancePage(function Page({ state, dispatch }) {
    return (
      <ViewportHeightContainer className="bg-light-gray">
        <div className="pa3 shadow-1">STATIC HEADER</div>
        <ScrollContainer>
          <TaskList tasks={state.tasks} dispatch={dispatch} />
        </ScrollContainer>
        <div className="pa3 shadow-1">STATIC FOOTER</div>
      </ViewportHeightContainer>
    )
  })