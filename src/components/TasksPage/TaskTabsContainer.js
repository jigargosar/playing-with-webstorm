import { composeHOC } from '../composeHOC'
import { TabsContainer } from '../../reakit-components'
import { Observer } from 'mobx-react'
import * as PropTypes from 'prop-types'
import React from 'react'

export const TaskTabsContainer = composeHOC()(function TaskTabsContainer({
  initialState,
  children,
  setTabId,
}) {
  return (
    <TabsContainer initialState={initialState}>
      {_tabProps => (
        <Observer>
          {() => {
            const tabProps = {
              ..._tabProps,
              show: tabId => {
                console.debug('show', tabId)
                setTabId(tabId)
                return _tabProps.show(tabId)
              },
            }
            return children(tabProps)
          }}
        </Observer>
      )}
    </TabsContainer>
  )
})

TaskTabsContainer.propTypes = {
  initialState: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    current: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
  setTabId: PropTypes.func.isRequired,
}
