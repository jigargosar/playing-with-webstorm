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
import { Button, FlexCenter, Group, secondaryDark } from '../reakit-components'
import { Flex, Heading, Shadow } from 'reakit'

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
  return <div className={cn('flex-auto pa2', { strike: done })}>{title}</div>
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

const Task = composeHOC()(function Task({ task }) {
  const selected = expr(() => store.isTaskSelected(task))
  const hovered = expr(() => store.isTaskHovered(task))
  return (
    <FlexCenter
      className={cn('br2')}
      relative
      {...(selected ? { color: '#fff', backgroundColor: secondaryDark } : {})}
      // backgroundColor={hovered ? highlightColor : undefined}
      onMouseEnter={handleMouseOverTask(task.id)}
      onMouseLeave={handleMouseLeaveTask(task.id)}
      onClickCapture={expr(() => handleSelectTask(task.id))}
    >
      {hovered && <TaskActions />}
      <TaskContent task={task} />
    </FlexCenter>
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
        <Flex marginBottom={'1rem'} as={[Heading, 'h3']}>
          Tasks
        </Flex>
        <TaskItems />
      </div>
    </div>
  )
})

export const Page = composeHOC()(function Page() {
  return (
    <ViewportHeightContainer className="bg-light-gray">
      <div className="pa3 relative">
        <Shadow />
        <div>STATIC HEADER</div>
        <Group>
          <Button onClick={store.deleteAll}>Delete All</Button>
          <Button onClick={store.deleteAll}>Delete All</Button>
        </Group>
      </div>
      <ScrollContainer>
        <MainContent />
      </ScrollContainer>
      <div className="pa3 relative">
        <Shadow />
        STATIC FOOTER
      </div>
    </ViewportHeightContainer>
  )
})
