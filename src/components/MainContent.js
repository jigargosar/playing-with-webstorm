import { composeHOC } from './composeHOC'
import { Base, Flex, Heading } from 'reakit'
import { Keyed } from '../shared-components/Keyed'
import * as PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { indexOf, map, pluck, tap } from 'ramda'
import { store } from './store'
import {
  FlexCenter,
  primaryLight,
  secondaryDark,
  Tabs,
  TabsContainer,
  TabsTab,
} from '../reakit-components'
import { Observer } from 'mobx-react'
import cn from 'classname'
import { Btn } from './Btn'

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
const linkEvent = (fn, ...args) => tap(e => fn(...args, e))
const Task = composeHOC()(function Task({ task }) {
  const selected = store.isTaskSelected(task)
  const hovered = store.isTaskHovered(task)
  return (
    <Base
      className={cn('mv2 pv2 br2')}
      {...(selected
        ? { color: '#fff', backgroundColor: secondaryDark }
        : hovered
          ? { backgroundColor: primaryLight }
          : {})}
      onMouseEnter={linkEvent(store.mouseEnterTask, task)}
      onMouseLeave={linkEvent(store.mouseLeaveTask, task)}
      onClickCapture={linkEvent(store.selectTask, task)}
    >
      <FlexCenter relative>
        {hovered && (
          <FloatingActionsContainer>
            <Btn onClick={store.toggleSelectedTaskDone}>{'Done'}</Btn>
            <Btn onClick={store.deleteSelectedTask}>{'Delete'}</Btn>
          </FloatingActionsContainer>
        )}
        <div className={cn('flex-auto ph2', { strike: task.done })}>
          {task.title}
        </div>
      </FlexCenter>
      <small className={'ttu f7 ph2'}>{`@${task.context.title}`}</small>
    </Base>
  )
})
Task.propTypes = {
  task: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
}
const TaskGroup = composeHOC()(function TaskGroup({
  group: { title, tasks },
  showContext,
}) {
  return (
    <div className="center measure mv3">
      <div className="pa3 br3 bg-white shadow-1 ">
        <Flex marginBottom={'1rem'} as={[Heading, 'h3']}>
          {title}
        </Flex>
        <Keyed
          list={tasks}
          as={Task}
          getProps={task => ({ task })}
          showContext={showContext}
        />
      </div>
    </div>
  )
})

TaskGroup.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
  }).isRequired,
  showContext: PropTypes.bool,
}

TaskGroup.defaultProps = {
  showContext: true,
}
const TaskTabsContainer = composeHOC()(function TaskTabsContainer({
  children,
}) {
  const tabIds = pluck('id')(store.getTabs())
  return (
    <TabsContainer
      initialState={{
        ids: tabIds,
        current: indexOf(store.getCurrentTabId())(tabIds),
      }}
    >
      {_tabProps => (
        <Observer>
          {() => {
            const tabProps = {
              ..._tabProps,
              show: tabId => {
                console.debug('show', tabId)
                store.setTabId(tabId)
                return _tabProps.show(tabId)
              },
            }
            return children(tabProps)
          }}
        </Observer>
      )}
    </TabsContainer>
  )
})
export const MainContent = composeHOC()(function MainContent() {
  return (
    <TaskTabsContainer>
      {tabProps => (
        <Fragment>
          <Tabs>
            <Keyed
              as={TabsTab}
              getProps={({ id, title }) => ({
                tab: id,
                children: title,
                ...tabProps,
              })}
              list={store.getTabs()}
            />
          </Tabs>
          <Tabs.Panel tab={store.getCurrentTabId()} {...tabProps}>
            {map(group => <TaskGroup key={group.id} group={group} />)(
              store.getTaskGroups(),
            )}
          </Tabs.Panel>
        </Fragment>
      )}
    </TaskTabsContainer>
  )
})
