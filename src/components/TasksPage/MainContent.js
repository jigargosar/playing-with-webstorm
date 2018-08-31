import { composeHOC } from '../composeHOC'
import { Base } from 'reakit'
import { Keyed } from '../../shared-components/Keyed'
import * as PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { indexOf, pluck, tap } from 'ramda'
import { store } from '../store'
import {
  FlexCenter,
  primaryLight,
  secondaryDark,
  Tabs,
  TabsTab,
} from '../../reakit-components/index'
import cn from 'classname'
import { Btn } from '../Btn'
import { TaskTabsContainer } from './TaskTabsContainer'
import { TaskGroup } from './TaskGroup'
import { FloatingActionsContainer } from './FloatingActionsContainer'

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

export const MainContent = composeHOC()(function MainContent() {
  const tabsList = store.getTabs()
  const currentTabId = store.getCurrentTabId()
  const tabIds = pluck('id')(tabsList)
  return (
    <TaskTabsContainer
      initialState={{
        ids: tabIds,
        current: indexOf(currentTabId)(tabIds),
      }}
      setTabId={store.setTabId}
    >
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
              list={tabsList}
            />
          </Tabs>
          <Tabs.Panel tab={currentTabId} {...tabProps}>
            <Keyed
              as={TaskGroup}
              list={store.getTaskGroups()}
              getProps={group => ({ group })}
              taskComponent={Task}
            />
          </Tabs.Panel>
        </Fragment>
      )}
    </TaskTabsContainer>
  )
})
