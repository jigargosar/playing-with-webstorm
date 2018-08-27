import React from 'react'
import { ScrollContainer, ViewportHeightContainer } from './containers'
import { compose, forEach } from 'ramda'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import { withMouseOverHandlers } from './withMouseOverHandlers'
import Radium from 'radium'
import { tr, trLink } from '../GlobalStyles'
import {
  handleSelectedTaskDelete,
  handleSelectedTaskToggleDone,
  handleSelectTask,
  sId,
  tasks,
  xr,
} from './withMobX'

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

const buttonStyle = {
  base: [
    // tr['.button-reset'],
    tr['.code'],
    tr['.ma1'],
    tr['.pa1'],
    {
      background: 'transparent',
      userSelect: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    trLink,
  ],
  warning: {
    ...tr['.orange'],
  },
}

const Btn = Radium(function FloatingAction(props) {
  return <button style={[buttonStyle.base, buttonStyle.warning]} {...props} />
})

function chainEvent(...eventHandlers) {
  return function(event) {
    forEach(handler => handler(event))(eventHandlers)
  }
}

const Task = compose(
  withMouseOverHandlers,
  xr.observer,
)(function Task({
  task: { id, title, done },
  handleMouseEnter,
  handleMouseLeave,
  mouseOver,
}) {
  const selected = sId() === id
  const handleSelect = handleSelectTask(id)
  return (
    <div
      className={cn(
        'mv2 flex items-center relative',
        mouseOver || selected ? 'yellow' : 'white',
      )}
      onMouseEnter={chainEvent(handleMouseEnter, handleSelect)}
      onMouseLeave={handleMouseLeave}
    >
      {mouseOver && (
        <FloatingActionsContainer>
          <Btn onClick={handleSelectedTaskToggleDone}>{'Done'}</Btn>
          <Btn onClick={handleSelectedTaskDelete}>{'Delete'}</Btn>
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
