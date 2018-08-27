import React from 'react'
import { ScrollContainer, ViewportHeightContainer } from './containers'
import { setDisplayName } from 'recompose'
import { compose, identity } from 'ramda'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import { withStateReducer } from './withStateReducer'
import { withMouseOverHandlers } from './withMouseOverHandlers'

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
  dispatch,
  handleMouseEnter,
  handleMouseLeave,
  mouseOver,
}) {
  const handleToggleDone = () => dispatch({ type: 'task.toggleDone', id })
  return (
    <div
      className={cn(
        'mv2 flex items-center relative',
        mouseOver ? 'yellow' : 'white',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {mouseOver && (
        <div
          className="absolute z-1  flex items-center "
          style={{ right: '0.5rem' }}
        >
          <div className="absolute ">
            <div className="pa2 bg-white-80 br3 shadow-1">
              {renderButton('Done', handleToggleDone)}
              {/*{renderButton('Schedule')}*/}
              {renderButton('Delete')}
            </div>
          </div>
        </div>
      )}
      <div
        className="flex-auto pa2 f5 bg-light-purple br3 "
        onClick={handleToggleDone}
      >
        <div className={cn({ strike: done })}>{title}</div>
      </div>
    </div>
  )
})
Task.propTypes = { task: PropTypes.object.isRequired }

const TaskList = compose(identity)(function TaskList({ tasks, dispatch }) {
  return (
    <div className="center measure-wide">
      <div className="ma3 pa3 br3 bg-white shadow-1 ">
        <div className="">Tasks</div>
        <Models models={tasks}>
          {task => <Task task={task} dispatch={dispatch} />}
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
  withStateReducer(),
  setDisplayName('Page'),
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
