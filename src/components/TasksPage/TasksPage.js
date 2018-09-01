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

export const TasksPage = composeHOC()(function Page({ store }) {
  const getTaskGroups = ({ taskList, ids, current }) =>
    getTaskGroupsForTab(ids[current], taskList)

  const getCurrentTaskList = compose(
    flattenGroupTasks,
    getTaskGroups,
  )
  const getSelectedTask = state => {
    const selectedTaskIdx = clampIdx(state.selectedTaskIdx)(
      getCurrentTaskList(state),
    )
    return compose(
      path([selectedTaskIdx]),
      getCurrentTaskList,
    )(state)
  }
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
            selectedTaskIdx: 0,
          }}
          selectors={{
            getTaskGroups: () => getTaskGroups,
            getSelectedTask: () => getSelectedTask,
          }}
          actions={{
            setSelectedTask: ({ id }) => state => {
              return {
                selectedTaskIdx: findIndexById(id)(getCurrentTaskList(state)),
              }
            },
          }}
        >
          {({
            getTaskGroups,
            getSelectedTask,
            getCurrentId,
            setSelectedTask,
            ...tabProps
          }) => {
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
                      selectTask: setSelectedTask,
                      deleteTask: identity,
                      toggleTaskDone: identity,
                      isTaskSelected: task => task === getSelectedTask(),
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
