import React, { Fragment } from 'react'
import { Scrollable, ViewportHeight } from '../containers'
import {
  Button,
  Group,
  Tabs,
  TabsContainer,
  TabsTab,
} from '../../reakit-components/index'
import { Shadow } from 'reakit'
import { Keyed } from '../../shared-components/Keyed'
import { GroupCard, GroupCardTitle } from './TaskGroup'
import { Task } from './Task'
import { flattenTasksFromGroups, tabList } from '../../models'
import { pluck } from 'ramda'
import identity from 'ramda/es/identity'
import { TasksContainer } from './TasksContainer'
import { validate } from '../../lib/validate'
import { mapA, tapLog, validateIO } from '../../lib/ramda-strict'

const renderTaskTabs = validateIO('OO', 'O')(function renderTaskTabs(
  state,
  tabProps,
) {
  const { setSelectedTask, getTaskGroupsForTabId, isTaskSelected } = state
  validate('FFF', [setSelectedTask, getTaskGroupsForTabId, isTaskSelected])
  const currentTabId = tapLog('currentTabId')(tabProps.getCurrentId())
  const taskGroups = getTaskGroupsForTabId(currentTabId)
  const taskList = flattenTasksFromGroups(taskGroups)
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
      <Tabs.Panel tab={currentTabId} {...tabProps}>
        {mapA(({ id, title, tasks }) => (
          <GroupCard key={id}>
            <GroupCardTitle>{title}</GroupCardTitle>
            {mapA(task => (
              <Task
                key={`{title}--${task.id}`}
                {...{
                  task,
                  selectTask: setSelectedTask,
                  deleteTask: identity,
                  toggleTaskDone: identity,
                  isTaskSelected,
                }}
              />
            ))(tasks)}
          </GroupCard>
        ))(taskGroups)}
      </Tabs.Panel>
    </Fragment>
  )
})
export function TasksPage({ store }) {
  return (
    <ViewportHeight className="bg-light-gray">
      <div className="pa3 relative">
        <Shadow depth={1} />
        <div>STATIC HEADER</div>
        <Group>
          <Button onClick={store && store.addMoreTasks}>Add More</Button>
          <Button onClick={store && store.deleteAllTasks}>Delete All</Button>
        </Group>
      </div>
      <Scrollable>
        <TabsContainer initialState={{ ids: pluck('id')(tabList) }}>
          {tabProps => (
            <TasksContainer>
              {state => renderTaskTabs(state, tabProps)}
            </TasksContainer>
          )}
        </TabsContainer>
      </Scrollable>
      <div className="pa3 relative">
        <Shadow depth={1} />
        STATIC FOOTER
      </div>
    </ViewportHeight>
  )
}

TasksPage.propTypes = {}

TasksPage.defaultProps = {}
