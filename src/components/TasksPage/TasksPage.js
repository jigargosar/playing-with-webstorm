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
import { validate } from '../../lib/validate'

function foo(state, tabProps) {
  const { setSelectedTask, getTaskGroupsForTabId, isTaskSelected } = state
  validate('FFF', [setSelectedTask, getTaskGroupsForTabId, isTaskSelected])
  const currentTabId = tabProps.getCurrentId()
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
      <Tabs.Panel tab={tap(console.log)(currentTabId)} {...tabProps}>
        <Keyed
          as={TaskGroup}
          list={getTaskGroupsForTabId(currentTabId)}
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
        <TabsContainer initialState={{ ids: pluck('id')(tabList) }}>
          {tabProps => (
            <TasksContainer>{state => foo(state, tabProps)}</TasksContainer>
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
