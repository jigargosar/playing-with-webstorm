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
import { partial, pluck } from 'ramda'
import identity from 'ramda/es/identity'
import { TasksContainer } from './TasksContainer'
import { mapA, tapLog, validateIO } from '../../lib/ramda-strict'
import { SingleSelectionContainer } from './SingleSelectionContainer'

const renderTaskTabs = validateIO('OO', 'O')(function renderTaskTabs(
  state,
  tabProps,
) {
  const currentTabId = tapLog('currentTabId')(tabProps.getCurrentId())
  const taskGroups = state.getTaskGroupsForTabId(currentTabId)
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
        <SingleSelectionContainer>
          {({ isSelected, setSelected }) =>
            mapA(({ id, title, tasks }) => (
              <GroupCard key={id}>
                <GroupCardTitle>{title}</GroupCardTitle>
                {mapA(task => (
                  <Task
                    key={`{title}--${task.id}`}
                    {...{
                      task,
                      selectTask: partial(setSelected)([task, taskList]),
                      deleteTask: identity,
                      toggleTaskDone: identity,
                      selected: isSelected(task, taskList),
                    }}
                  />
                ))(tasks)}
              </GroupCard>
            ))(taskGroups)
          }
        </SingleSelectionContainer>
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
