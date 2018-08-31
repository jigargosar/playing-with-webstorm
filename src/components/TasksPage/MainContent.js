import { composeHOC } from '../composeHOC'
import { Keyed } from '../../shared-components/Keyed'
import React, { Fragment } from 'react'
import { indexOf, pick, pluck } from 'ramda'
import { store } from '../store'
import { Tabs, TabsTab } from '../../reakit-components/index'
import { TaskTabsContainer } from './TaskTabsContainer'
import { TaskGroup } from './TaskGroup'
import { Task } from './Task'

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
