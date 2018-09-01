import React, { Fragment } from 'react'
import { ScrollContainer, ViewportHeightContainer } from '../containers'
import {
  Button,
  Group,
  Tabs,
  TabsContainer,
  TabsTab,
} from '../../reakit-components/index'
import { Shadow } from 'reakit'
import { Keyed } from '../../shared-components/Keyed'
import { TaskGroup } from './TaskGroup'
import { Task } from './Task'
import { tabList } from '../../models'
import { pluck } from 'ramda'
import identity from 'ramda/es/identity'
import { TasksContainer } from './TasksContainer'
import tap from 'ramda/es/tap'

function renderTaskTabs({
  tabProps,
  taskGroups,
  setSelectedTask,
  isTaskSelected,
}) {
  return (
    <Fragment>
      <Tabs>
        <Keyed
          as={TabsTab}
          getProps={({ id, title }) => ({
            tab: id,
            children: title,
            ...tabProps,
          })}
          list={tabList}
        />
      </Tabs>
      <Tabs.Panel tab={tap(console.log)(tabProps.getCurrentId())} {...tabProps}>
        <Keyed
          as={TaskGroup}
          list={taskGroups}
          getProps={group => ({ group })}
          taskComponent={Task}
          taskProps={{
            selectTask: setSelectedTask,
            deleteTask: identity,
            toggleTaskDone: identity,
            isTaskSelected,
          }}
        />
      </Tabs.Panel>
    </Fragment>
  )
}

export function TasksPage({ store }) {
  return (
    <ViewportHeightContainer className="bg-light-gray">
      <div className="pa3 relative">
        <Shadow depth={1} />
        <div>STATIC HEADER</div>
        <Group>
          <Button onClick={store && store.addMoreTasks}>Add More</Button>
          <Button onClick={store && store.deleteAllTasks}>Delete All</Button>
        </Group>
      </div>
      <ScrollContainer>
        <TabsContainer
          initialState={{ ids: pluck('id')(tabList) }}
          onUpdate={console.log}
        >
          {tabProps => (
            <TasksContainer>
              {({ setSelectedTask, getTaskGroupsForTabId, isTaskSelected }) =>
                renderTaskTabs({
                  tabProps,
                  taskGroups: getTaskGroupsForTabId(tabProps.getCurrentId()),
                  setSelectedTask,
                  isTaskSelected,
                })
              }
            </TasksContainer>
          )}
        </TabsContainer>
      </ScrollContainer>
      <div className="pa3 relative">
        <Shadow depth={1} />
        STATIC FOOTER
      </div>
    </ViewportHeightContainer>
  )
}

TasksPage.propTypes = {}

TasksPage.defaultProps = {}
