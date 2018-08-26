import { withProps } from 'recompose'

export const FullHeightContainer = withProps({
  className: 'h-100 overflow-hidden flex flex-column',
})('div')

export const ViewportHeightContainer = withProps(({ className }) => ({
  className: `vh-100 overflow-hidden flex flex-column ${className}`,
}))('div')

export const ScrollContainer = withProps({
  className: 'overflow-scroll flex-grow-1',
})('div')
