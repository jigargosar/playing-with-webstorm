import { composeHOC } from '../composeHOC'
import { TabsContainer } from '../../reakit-components'
import { Observer } from 'mobx-react'
import * as PropTypes from 'prop-types'
import React from 'react'

export const TaskTabsContainer = composeHOC()(function TaskTabsContainer({
  children,
}) {
  return (
    <TabsContainer>
      {tabProps => (
        <Observer>
          {() => {
            return children(tabProps)
          }}
        </Observer>
      )}
    </TabsContainer>
  )
})

TaskTabsContainer.propTypes = {
  children: PropTypes.func.isRequired,
}
