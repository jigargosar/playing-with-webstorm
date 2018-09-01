import { Base, Heading, styled } from 'reakit'

export const TaskGroupTitle = styled(Heading).attrs({ as: 'h3' })`
  margin-bottom: 1rem;
`

export const TaskGroup = styled(Base).attrs({
  className: 'center measure mv3 pa3 br3 bg-white shadow-1 ',
})``
