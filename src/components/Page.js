import React from 'react'
import { ScrollContainer, ViewportHeightContainer } from './containers'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import {
  handleMouseLeaveTask,
  handleMouseOverTask,
  handleSelectTask,
  store,
} from './store'
import { Btn } from './Btn'
import { expr } from 'mobx-utils'
import { composeHOC } from './composeHOC'
import { Button, Group, primaryColor } from '../reakit-components'
import { Flex } from 'reakit'

const FloatingActionsContainer = composeHOC()(
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

const TaskContent = composeHOC()(function TaskContent({
  task: { done, title },
}) {
  return (
    <div className={cn('flex-auto pa2 f5 br2', { strike: done })}>{title}</div>
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
      <Btn onClick={store.toggleSelectedTaskDone}>{'Done'}</Btn>
      <Btn onClick={store.deleteSelectedTask}>{'Delete'}</Btn>
    </FloatingActionsContainer>
  )
})

const TaskContainer = composeHOC()(function TaskContainer({
  task,
  ...otherProps
}) {
  const selected = expr(() => store.isTaskSelected(task))
  return (
    <Flex
      className={cn('mv2 flex items-center relative')}
      {...otherProps}
      style={{
        ...(selected ? { color: primaryColor } : {}),
      }}
    />
  )
})

TaskContainer.propTypes = {
  task: PropTypes.object.isRequired,
}

const Task = composeHOC()(function Task({ task }) {
  return (
    <TaskContainer
      onMouseEnter={handleMouseOverTask(task.id)}
      onMouseLeave={handleMouseLeaveTask(task.id)}
      onClickCapture={expr(() => handleSelectTask(task.id))}
      task={task}
    >
      {expr(() => store.isTaskHovered(task)) && <TaskActions />}
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
      <div className="pa3 shadow-1">
        <div>STATIC HEADER</div>
        <Group>
          <Button onClick={store.deleteAll}>Delete All</Button>
          <Button onClick={store.deleteAll}>Delete All</Button>
        </Group>
      </div>
      <ScrollContainer>
        <MainContent />
      </ScrollContainer>
      <div className="pa3 shadow-1">STATIC FOOTER</div>
    </ViewportHeightContainer>
  )
})
