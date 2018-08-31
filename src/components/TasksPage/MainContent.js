import { composeHOC } from '../composeHOC'
import { Base } from 'reakit'
import { Keyed } from '../../shared-components/Keyed'
import * as PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { indexOf, pick, pluck, tap } from 'ramda'
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
const Task = composeHOC()(function Task({
  task,
  mouseEnterTask,
  isTaskSelected,
  isTaskHovered,
  mouseLeaveTask,
  selectTask,
  toggleSelectedTaskDone,
  deleteSelectedTask,
}) {
  const selected = isTaskSelected(task)
  const hovered = isTaskHovered(task)
  return (
    <Base
      className={cn('mv2 pv2 br2')}
      {...(selected
        ? { color: '#fff', backgroundColor: secondaryDark }
        : hovered
          ? { backgroundColor: primaryLight }
          : {})}
      onMouseEnter={linkEvent(mouseEnterTask, task)}
      onMouseLeave={linkEvent(mouseLeaveTask, task)}
      onClickCapture={linkEvent(selectTask, task)}
    >
      <FlexCenter relative>
        {hovered && (
          <FloatingActionsContainer>
            <Btn onClick={toggleSelectedTaskDone}>{'Done'}</Btn>
            <Btn onClick={deleteSelectedTask}>{'Delete'}</Btn>
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
  isTaskSelected: PropTypes.func.isRequired,
  isTaskHovered: PropTypes.func.isRequired,
  mouseEnterTask: PropTypes.func.isRequired,
  mouseLeaveTask: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
  toggleSelectedTaskDone: PropTypes.func.isRequired,
  deleteSelectedTask: PropTypes.func.isRequired,
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
              taskProps={pick([
                'isTaskSelected',
                'isTaskHovered',
                'mouseEnterTask',
                'mouseLeaveTask',
                'selectTask',
                'toggleSelectedTaskDone',
                'deleteSelectedTask',
              ])(store)}
            />
          </Tabs.Panel>
        </Fragment>
      )}
    </TaskTabsContainer>
  )
})
