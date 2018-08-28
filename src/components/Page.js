import React from 'react'
import { ScrollContainer, ViewportHeightContainer } from './containers'
import { compose } from 'ramda'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import { withMouseOverHandlers } from './withMouseOverHandlers'
import Radium from 'radium'
import { tr } from '../GlobalStyles'
import {
  handleDeleteSelectedTask,
  handleSelectTask,
  handleToggleDoneSelectedTask,
  sId,
  store,
} from './store'
import { Btn } from './Btn'
import { observer } from 'mobx-react'
import { expr } from 'mobx-utils'
import { composeHOC } from './composeHOC'
import { secondaryColor } from '../theme'

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

const TaskContent = composeHOC()(function TaskContent({
  task: { done, title },
}) {
  return (
    <div
      className={cn('flex-auto pa2 f5 br2', {
        strike: done,
      })}
      // style={[primaryBgColor]}
    >
      {title}
    </div>
  )
})
TaskContent.propTypes = {
  task: PropTypes.shape({
    done: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

const TaskActions = composeHOC()(function TaskActions() {
  return (
    <FloatingActionsContainer>
      <Btn onClick={handleToggleDoneSelectedTask}>{'Done'}</Btn>
      <Btn onClick={handleDeleteSelectedTask}>{'Delete'}</Btn>
    </FloatingActionsContainer>
  )
})

TaskActions.propTypes = {
  handleSelectedTaskDelete: PropTypes.func,
  handleSelectedTaskToggleDone: PropTypes.func,
}

const TaskContainer = composeHOC()(function TaskContainer({
  selected,
  ...otherProps
}) {
  return (
    <div
      className={cn('mv2 flex items-center relative')}
      {...otherProps}
      style={[selected && secondaryColor]}
    />
  )
})

TaskContainer.propTypes = {
  selected: PropTypes.bool.isRequired,
}

const Task = compose(
  withMouseOverHandlers,
  Radium,
  observer,
)(function Task({ task, handleMouseEnter, handleMouseLeave, mouseOver }) {
  const selected = sId() === task.id
  console.log('selected', selected)
  return (
    <TaskContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClickCapture={expr(() => handleSelectTask(task.id))}
      selected={selected}
    >
      {mouseOver && <TaskActions />}
      <TaskContent task={task} />
    </TaskContainer>
  )
})
Task.propTypes = {
  task: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
}

const TaskItems = composeHOC()(function TaskItems() {
  return <Models models={store.tasks}>{task => <Task task={task} />}</Models>
})

const MainContent = composeHOC()(function MainContent() {
  return (
    <div className="center measure-wide mv3">
      <div className="pa3 br3 bg-white shadow-1 ">
        <div className="">Tasks</div>
        <TaskItems />
      </div>
    </div>
  )
})

export const Page = composeHOC()(function Page() {
  return (
    <ViewportHeightContainer className="bg-light-gray">
      <div className="pa3 shadow-1">STATIC HEADER</div>
      <ScrollContainer>
        <MainContent />
      </ScrollContainer>
      <div className="pa3 shadow-1">STATIC FOOTER</div>
    </ViewportHeightContainer>
  )
})
