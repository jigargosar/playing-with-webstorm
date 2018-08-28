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
  handleSelectedTaskDelete,
  handleSelectedTaskToggleDone,
  handleSelectTask,
  sId,
  tasks,
} from './withMobX'
import { Btn } from './Btn'
import { observer } from 'mobx-react'
import { expr } from 'mobx-utils'

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

const TaskContent = observer(function TaskContent({ task: { done, title } }) {
  console.log('done', done)
  return (
    <div
      className={cn('flex-auto pa2 f5 bg-light-purple br2', {
        strike: done,
      })}
    >
      {title}
    </div>
  )
})

const TaskActions = observer(function TaskActions() {
  return (
    <FloatingActionsContainer>
      <Btn onClick={handleSelectedTaskToggleDone}>{'Done'}</Btn>
      <Btn onClick={handleSelectedTaskDelete}>{'Delete'}</Btn>
    </FloatingActionsContainer>
  )
})

TaskActions.propTypes = {
  handleSelectedTaskDelete: PropTypes.func,
  handleSelectedTaskToggleDone: PropTypes.func,
}

const TaskContainer = observer(function TaskContainer({
  selected,
  ...otherProps
}) {
  return (
    <div
      className={cn(
        'mv2 flex items-center relative',
        selected ? 'yellow' : 'white',
      )}
      {...otherProps}
    />
  )
})

TaskContainer.propTypes = {
  selected: PropTypes.bool.isRequired,
}

const Task = compose(
  withMouseOverHandlers,
  observer,
)(function Task({ task, handleMouseEnter, handleMouseLeave, mouseOver }) {
  return (
    <TaskContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClickCapture={expr(() => handleSelectTask(task.id))}
      selected={sId() === task.id}
    >
      {mouseOver && <TaskActions />}
      <TaskContent task={task} />
    </TaskContainer>
  )
})
Task.propTypes = {
  task: PropTypes.object.isRequired,
}

const MainContent = observer(function MainContent() {
  return (
    <div className="center measure-wide mv3">
      <div className="pa3 br3 bg-white shadow-1 ">
        <div className="">Tasks</div>
        <Models models={tasks()}>{task => <Task task={task} />}</Models>
      </div>
    </div>
  )
})

export const Page = observer(function Page() {
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
