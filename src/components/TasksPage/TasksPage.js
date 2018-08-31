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
import { compose, head, pluck } from 'ramda'
import identity from 'ramda/es/identity'

const getTaskGroupsFromState = ({ taskList, ids, current }) =>
  getTaskGroupsForTab(ids[current], taskList)

const getFlatTaskList = compose(
  flattenGroupTasks,
  getTaskGroupsFromState,
)
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
        <TabsContainer
          initialState={{
            ids: pluck('id')(tabList),
            taskList: createSampleTaskList(),
          }}
          selectors={{
            getTaskGroups: () => getTaskGroupsFromState,
            getFlatTaskList: () => getFlatTaskList,
            selectedTask: () => head(getFlatTaskList()),
          }}
        >
          {({ getTaskGroups, selectedTask, getCurrentId, ...tabProps }) => {
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
                <Tabs.Panel tab={getCurrentId()} {...tabProps}>
                  <Keyed
                    as={TaskGroup}
                    list={getTaskGroups()}
                    getProps={group => ({ group })}
                    taskComponent={Task}
                    taskProps={{
                      selectTask: identity,
                      deleteTask: identity,
                      toggleTaskDone: identity,
                      isTaskSelected: task => task === selectedTask,
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
