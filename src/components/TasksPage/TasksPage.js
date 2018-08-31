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
import merge from 'ramda/es/merge'

export const TasksPage = composeHOC()(function Page({ store }) {
  const tabsList = store.getTabs()
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
          {_tabProps => (
            <Observer>
              {() => {
                const tabProps = merge(_tabProps)({
                  tab: _tabProps.getCurrentId() || tabsList[0].id,
                })
                return (
                  <Fragment>
                    <Tabs>
                      <Keyed
                        as={TabsTab}
                        getProps={({ id, title }) => ({
                          children: title,
                          ...tabProps,
                          tab: id,
                        })}
                        list={tabsList}
                      />
                    </Tabs>
                    <Tabs.Panel {...tabProps}>
                      <Keyed
                        as={TaskGroup}
                        list={store.getTaskGroups()}
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
