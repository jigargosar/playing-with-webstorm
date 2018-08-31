import { Button as BaseButton, Flex, Group, styled, Tabs } from 'reakit'
import { always } from 'ramda'

export { Flex, Group }

// https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=03A9F4&secondary.color=1976D2
export const primary = '#03a9f4'
export const primaryDark = '#007ac1'
export const primaryLight = '#67daff'
export const secondary = '#1976d2'
export const secondaryLight = '#63a4ff'
export const secondaryDark = '#004ba0'
export const highlightColor = 'lightyellow'

export const Button = styled(BaseButton)`
  // text-transform: uppercase;
  color: ${primary};
  // font-size: 14px;
  height: 2em;
`

export const FlexCenter = styled(Flex)`
  align-items: center;
`
export { Tabs }
export const TabsTab = Tabs.Tab
export const TabsContainer = always(Tabs.Container)()
