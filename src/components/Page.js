import React, { Fragment } from 'react'
import { ScrollContainer, ViewportHeightContainer } from './containers'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import { store } from './store'
import { Btn } from './Btn'
import { composeHOC } from './composeHOC'
import {
  Button,
  FlexCenter,
  Group,
  primaryLight,
  secondaryDark,
} from '../reakit-components'
import { Flex, Heading, Shadow, Tabs } from 'reakit'
import { indexOf, tap } from 'ramda'
import { Observer } from 'mobx-react'

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

const linkEvent = (fn, ...args) => tap(e => fn(...args, e))

const Task = composeHOC()(function Task({ task }) {
  const selected = store.isTaskSelected(task)
  const hovered = store.isTaskHovered(task)
  return (
    <FlexCenter
      className={cn('br2')}
      relative
      {...(selected
        ? { color: '#fff', backgroundColor: secondaryDark }
        : hovered
          ? { backgroundColor: primaryLight }
          : {})}
      onMouseEnter={linkEvent(store.mouseEnterTask, task)}
      onMouseLeave={linkEvent(store.mouseLeaveTask, task)}
      onClickCapture={linkEvent(store.selectTask, task)}
    >
      {hovered && <TaskActions />}
      <TaskContent task={task} />
    </FlexCenter>
  )
})
Task.propTypes = {
  task: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
}

const TaskItems = composeHOC()(function TaskItems({ tasks }) {
  return <Models models={tasks}>{task => <Task task={task} />}</Models>
})

const TaskGroup = composeHOC()(function TaskGroup({ title, tasks }) {
  return (
    <div className="center measure mv3">
      <div className="pa3 br3 bg-white shadow-1 ">
        <Flex marginBottom={'1rem'} as={[Heading, 'h3']}>
          {title}
        </Flex>
        <TaskItems tasks={tasks} />
      </div>
    </div>
  )
})

TaskGroup.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
}

const MainContent = composeHOC()(function MainContent() {
  const ids = ['todo', 'done']
  return (
    <Fragment>
      <Tabs.Container
        initialState={{ ids, current: indexOf(store.getTab())(ids) }}
      >
        {_tabProps => {
          const tabProps = {
            ..._tabProps,
            show: tab => {
              console.debug('show', tab)
              store.setTab(tab)
              return _tabProps.show(tab)
            },
          }
          return (
            <Observer>
              {() => (
                <Fragment>
                  <Tabs>
                    <Tabs.Tab tab={'todo'} {...tabProps}>
                      TODO
                    </Tabs.Tab>
                    <Tabs.Tab tab={'done'} {...tabProps}>
                      DONE
                    </Tabs.Tab>
                  </Tabs>
                  <Tabs.Panel tab={'todo'} {...tabProps}>
                    <TaskGroup title={'Todo'} tasks={store.getTodoTasks()} />
                  </Tabs.Panel>
                  <Tabs.Panel tab={'done'} {...tabProps}>
                    <TaskGroup title={'Done'} tasks={store.getDoneTasks()} />
                  </Tabs.Panel>
                </Fragment>
              )}
            </Observer>
          )
        }}
      </Tabs.Container>
    </Fragment>
  )
})

export const Page = composeHOC()(function Page() {
  return (
    <ViewportHeightContainer className="bg-light-gray">
      <div className="pa3 relative">
        <Shadow depth={1} />
        <div>STATIC HEADER</div>
        <Group>
          <Button onClick={store.addMoreTasks}>Add More</Button>
          <Button onClick={store.deleteAllTasks}>Delete All</Button>
        </Group>
      </div>
      <ScrollContainer>
        <MainContent />
      </ScrollContainer>
      <div className="pa3 relative">
        <Shadow depth={1} />
        STATIC FOOTER
      </div>
    </ViewportHeightContainer>
  )
})
