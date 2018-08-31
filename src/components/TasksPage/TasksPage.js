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
import { Observer } from 'mobx-react'
import { createSampleTasks, getTaskGroups } from '../../models'

export const TasksPage = composeHOC()(function Page({ store }) {
  const tabsList = store.getTabs()
  const tasks = createSampleTasks()
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
          {tabProps => (
            <Observer>
              {() => {
                const currentTabId = tabProps.getCurrentId() || tabsList[0].id
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
                        list={getTaskGroups(currentTabId, tasks)}
                        getProps={group => ({ group })}
                        taskComponent={Task}
                        taskProps={store}
                      />
                    </Tabs.Panel>
                  </Fragment>
                )
              }}
            </Observer>
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
