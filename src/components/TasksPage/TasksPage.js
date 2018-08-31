import React, { Fragment } from 'react'
import { ScrollContainer, ViewportHeightContainer } from '../containers'
import * as PropTypes from 'prop-types'
import { store } from '../store'
import { composeHOC } from '../composeHOC'
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
import {
  createSampleTaskList,
  flattenGroupTasks,
  getTaskGroupsForTab,
  tabList,
} from '../../models'
import { head, pluck } from 'ramda'
import identity from 'ramda/es/identity'

export const TasksPage = composeHOC()(function Page({ store }) {
  const tabsList = tabList
  const taskList = createSampleTaskList()
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
        <TabsContainer
          initialState={{ ids: pluck('id')(tabList), taskList, tabsList }}
        >
          {({ taskList, tabsList, ...tabProps }) => {
            const currentTabId = tabProps.getCurrentId()
            const taskGroups = getTaskGroupsForTab(currentTabId, taskList)
            const flattenedTaskList = flattenGroupTasks(taskGroups)
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
                    list={tabsList}
                  />
                </Tabs>
                <Tabs.Panel tab={currentTabId} {...tabProps}>
                  <Keyed
                    as={TaskGroup}
                    list={taskGroups}
                    getProps={group => ({ group })}
                    taskComponent={Task}
                    taskProps={{
                      selectTask: identity,
                      isTaskSelected: task => task === head(flattenedTaskList),
                    }}
                  />
                </Tabs.Panel>
              </Fragment>
            )
          }}
        </TabsContainer>
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
