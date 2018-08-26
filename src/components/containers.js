import { withProps } from 'recompose'

export const FullHeightContainer = withProps({
  className: 'h-100 overflow-hidden flex flex-column',
})('div')
export const ViewportHeightContainer = withProps({
  className: 'vh-100 overflow-hidden flex flex-column',
})('div')
