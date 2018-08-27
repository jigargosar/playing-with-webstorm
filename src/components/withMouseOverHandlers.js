import { withStateHandlers } from 'recompose'

export const withMouseOverHandlers = withStateHandlers(
  { mouseOver: false },
  {
    handleMouseEnter: () => () => {
      return { mouseOver: true }
    },
    handleMouseLeave: () => () => {
      return { mouseOver: false }
    },
  },
)
