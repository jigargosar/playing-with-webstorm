import React from 'react'
import { ScrollContainer, ViewportHeightContainer } from './containers'
import { compose, forEach } from 'ramda'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import { withMouseOverHandlers } from './withMouseOverHandlers'
import { injectState, withAppState } from './withFreactal'
import Radium from 'radium'
import { tr } from '../GlobalStyles'

const FloatingActionsContainer = Radium(function FloatingActionsContainer({
  children,
}) {
  return (
    <div
      style={[
        { right: '2rem' },
        tr['.absolute'],
        tr['.z-1'],
        tr['.flex'],
        tr['.items-center'],
      ]}
    >
      <div className="absolute ">
        <div className="pa2 bg-white-80 br3 shadow-1">{children}</div>
      </div>
    </div>
  )
})

const style = {
  button: [
    //
    tr['.ma1'],
    tr['.pa1'],
    tr['.link'],
    tr['.button-reset'],
    tr['.bg-transparent'],
    tr['.bn'],
    tr['.no-select'],
    tr['.pointer'],
    tr['.code'],
  ],
}

const FloatingAction = Radium(function FloatingAction(props) {
  return (
    <button
      className="
        orange

        "
      style={[
        //
        // tr['.ma1'],
        // tr['.pa1'],
        style.button,
      ]}
      {...props}
    />
  )
})
function renderButton(content, clickHandler) {
  return <FloatingAction onClick={clickHandler}>{content}</FloatingAction>
}

const enhanceTask = compose(
  withMouseOverHandlers,
  injectState,
)

function chainEvent(...eventHandlers) {
  return function(event) {
    forEach(handler => handler(event))(eventHandlers)
  }
}

const Task = enhanceTask(function Task({
  task: { id, title, done },
  state: { isTaskSelected, selectedTaskId, selectedTaskIdx },
  effects,
  handleMouseEnter,
  handleMouseLeave,
  mouseOver,
}) {
  // const handleToggleDone = () => dispatch({ type: 'task.toggleDone', id })
  const selected = isTaskSelected(id)
  const handleSelectTask = () => effects.selectTaskWithId(id)
  return (
    <div
      className={cn(
        'mv2 flex items-center relative',
        mouseOver || selected ? 'yellow' : 'white',
      )}
      onMouseEnter={chainEvent(handleMouseEnter, handleSelectTask)}
      onMouseLeave={handleMouseLeave}
    >
      {mouseOver && (
        <FloatingActionsContainer>
          {renderButton('Done', effects.toggleSelectedTaskDone)}
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

const enhanceTaskList = compose(injectState)
const TaskList = enhanceTaskList(function TaskList({
  state: { tasks, selectedTaskIdx },
  effects,
}) {
  return (
    <div className="center measure-wide mv3">
      <div className="pa3 br3 bg-white shadow-1 ">
        <div className="">Tasks</div>
        <Models models={tasks}>{task => <Task task={task} />}</Models>
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
