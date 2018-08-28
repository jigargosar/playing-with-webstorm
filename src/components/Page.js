import React from 'react'
import { ScrollContainer, ViewportHeightContainer } from './containers'
import { compose } from 'ramda'
import * as PropTypes from 'prop-types'
import { chainEvent, cn } from '../lib/react-ext'
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
  xr,
} from './withMobX'
import { Btn } from './Btn'
import * as x from 'mobx'

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

const TaskContent = xr.observer(function TaskContent({
  task: { done, title },
  handleSelect,
}) {
  return (
    <div
      className={cn('flex-auto pa2 f5 bg-light-purple br2', {
        strike: done,
      })}
      onClick={handleSelect}
    >
      {title}
    </div>
  )
})

const TaskActions = xr.observer(function TaskActions() {
  return (
    <FloatingActionsContainer>
      <Btn onClick={handleSelectedTaskToggleDone}>{'Done'}</Btn>
      <Btn onClick={handleSelectedTaskDelete}>{'Delete'}</Btn>
    </FloatingActionsContainer>
  )
})

const Task = compose(
  withMouseOverHandlers,
  xr.observer,
)(function Task({ task, handleMouseEnter, handleMouseLeave, mouseOver }) {
  const id = task.id
  const selected = sId() === id
  const handleSelect = x.computed(() => handleSelectTask(id)).get()
  return (
    <div
      className={cn(
        'mv2 flex items-center relative',
        mouseOver || selected ? 'yellow' : 'white',
      )}
      onMouseEnter={chainEvent(handleMouseEnter, handleSelect)}
      onMouseLeave={handleMouseLeave}
    >
      {mouseOver && <TaskActions />}
      <TaskContent task={task} handleSelect={handleSelect} />
    </div>
  )
})
Task.propTypes = { task: PropTypes.object.isRequired }

const MainContent = compose(xr.observer)(function MainContent() {
  return (
    <div className="center measure-wide mv3">
      <div className="pa3 br3 bg-white shadow-1 ">
        <div className="">Tasks</div>
        <Models models={tasks()}>{task => <Task task={task} />}</Models>
      </div>
    </div>
  )
})

export const Page = compose(xr.observer)(function Page() {
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
