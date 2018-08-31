import React, { Fragment } from 'react'
import { ScrollContainer, ViewportHeightContainer } from '../containers'
import * as PropTypes from 'prop-types'
import { store } from '../store'
import { composeHOC } from '../composeHOC'
import { Button, Group, Tabs, TabsTab } from '../../reakit-components/index'
import { Shadow } from 'reakit'
import { indexOf, pick, pluck } from 'ramda'
import { TaskTabsContainer } from './TaskTabsContainer'
import { Keyed } from '../../shared-components/Keyed'
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
export const TasksPage = composeHOC()(function Page({ store }) {
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

TasksPage.propTypes = {
  store: PropTypes.shape({
    addMoreTasks: PropTypes.func.isRequired,
    deleteAllTasks: PropTypes.func.isRequired,
  }),
}

TasksPage.defaultProps = {
  store,
}
