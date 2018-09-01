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
import { tabList } from '../../models'
import { pluck } from 'ramda'
import identity from 'ramda/es/identity'
import { TasksContainer } from './TasksContainer'

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
          {tabProps => (
            <TasksContainer tabProps={tabProps}>
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
