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
  getTaskGroups,
  tabList,
} from '../../models'
import merge from 'ramda/es/merge'
import { head } from 'ramda'

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
        <TabsContainer>
          {tabProps => {
            const currentTabId = tabProps.getCurrentId() || tabsList[0].id
            const flattenedTaskList = flattenGroupTasks()
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
                    list={getTaskGroups(currentTabId, taskList)}
                    getProps={group => ({ group })}
                    taskComponent={Task}
                    taskProps={merge(store, {
                      isTaskSelected: task => task === head(flattenedTaskList),
                    })}
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
