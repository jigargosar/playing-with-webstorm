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
import { expr } from 'mobx-utils'
import { observer } from 'mobx-react'

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

const TaskActions = observer(function TaskActions({
  handleSelectedTaskDelete,
  handleSelectedTaskToggleDone,
}) {
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

TaskActions.defaultProps = {
  handleSelectedTaskDelete,
  handleSelectedTaskToggleDone,
}

const Task = compose(
  withMouseOverHandlers,
  observer,
)(function Task({
  task,
  handleMouseEnter,
  handleMouseLeave,
  mouseOver,
  handleSelect = expr(() => handleSelectTask(task.id)),
}) {
  const id = task.id
  const selected = sId() === id
  return (
    <div
      className={cn(
        'mv2 flex items-center relative',
        mouseOver || selected ? 'yellow' : 'white',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSelect}
    >
      {mouseOver && <TaskActions />}
      <TaskContent task={task} />
    </div>
  )
})
Task.propTypes = {
  task: PropTypes.object.isRequired,
  handleSelect: PropTypes.func,
}

const MainContent = compose(observer)(function MainContent() {
  return (
    <div className="center measure-wide mv3">
      <div className="pa3 br3 bg-white shadow-1 ">
        <div className="">Tasks</div>
        <Models models={tasks()}>{task => <Task task={task} />}</Models>
      </div>
    </div>
  )
})

export const Page = compose(observer)(function Page() {
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
