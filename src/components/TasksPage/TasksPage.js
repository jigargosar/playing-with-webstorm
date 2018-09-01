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
import { compose, pluck } from 'ramda'
import identity from 'ramda/es/identity'
import path from 'ramda/es/path'
import { clampIdx } from '../../lib/ramda-strict'
import { findIndexById } from '../../lib/ramda-ext'
import { Container } from '../../lib-exports/reakit-exports'

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
          }}
        >
          {tabProps => {
            const taskCollectionFromState = path(['taskCollection'])
            const getCurrentTabId = tabProps.getCurrentId
            const taskGroupsFromState = state =>
              getTaskGroupsForTab(
                getCurrentTabId(),
                taskCollectionFromState(state),
              )

            const currentTaskListFromState = compose(
              flattenGroupTasks,
              taskGroupsFromState,
            )
            const selectedTaskFromState = state => {
              const selectedTaskIdx = clampIdx(state.selectedTaskIdx)(
                currentTaskListFromState(state),
              )
              return compose(
                path([selectedTaskIdx]),
                currentTaskListFromState,
              )(state)
            }
            return (
              <Container
                initialState={{
                  taskCollection: createSampleTaskList(),
                  selectedTaskIdx: 0,
                }}
                selectors={{
                  getTaskGroups: () => taskGroupsFromState,
                  getSelectedTask: () => selectedTaskFromState,
                  getCurrentTabId: () => getCurrentTabId,
                  getTabProps: () => () => tabProps,
                }}
                actions={{
                  setSelectedTask: ({ id }) => state => {
                    return {
                      selectedTaskIdx: findIndexById(id)(
                        currentTaskListFromState(state),
                      ),
                    }
                  },
                }}
              >
                {({
                  getCurrentTabId,
                  setSelectedTask,
                  getTabProps,
                  getTaskGroups,
                  getSelectedTask,
                }) => (
                  <Fragment>
                    <Tabs>
                      <Keyed
                        as={TabsTab}
                        getProps={({ id, title }) => ({
                          tab: id,
                          children: title,
                          ...getTabProps(),
                        })}
                        list={tabList}
                      />
                    </Tabs>
                    <Tabs.Panel tab={getCurrentTabId()} {...getTabProps()}>
                      <Keyed
                        as={TaskGroup}
                        list={getTaskGroups()}
                        getProps={group => ({ group })}
                        taskComponent={Task}
                        taskProps={{
                          selectTask: setSelectedTask,
                          deleteTask: identity,
                          toggleTaskDone: identity,
                          isTaskSelected: task => task === getSelectedTask(),
                        }}
                      />
                    </Tabs.Panel>
                  </Fragment>
                )}
              </Container>
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
