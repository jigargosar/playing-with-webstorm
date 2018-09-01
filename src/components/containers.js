import { withProps } from 'recompose'

function withAdditionalClassName(additionalClassName) {
  return withProps(({ className }) => ({
    className: `${additionalClassName} ${className}`,
  }))
}

export const FullHeightContainer = withAdditionalClassName(
  'h-100 overflow-hidden flex flex-column',
)('div')

export const ViewportHeight = withAdditionalClassName(
  'vh-100 overflow-hidden flex flex-column',
)('div')

export const Scrollable = withAdditionalClassName(
  'overflow-scroll flex-grow-1',
)('div')
