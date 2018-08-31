import PropTypes from 'prop-types'
import { Base, css, Group, Hidden, styled } from 'reakit'
import { ifProp } from 'styled-tools'
import { primaryDark, primaryLight } from '../../../reakit-components'

export const TaskFloatingActions = styled(Hidden)`
  position: absolute;
  right: -4rem;
  z-index: 1;
`
const floatingActionsClass = `.${TaskFloatingActions.styledComponentId}`

export const TaskItem = styled(Base).attrs({ className: 'mv2 pv2 br2' })`
  &:hover {
    color: #000;
    background-color: ${primaryLight};
  }
  ${ifProp(
    'selected',
    css`
      &,
      &:hover {
        color: #fff;
        background-color: ${primaryDark};
      }
    `,
  )};

  & ${floatingActionsClass} {
    display: none;
  }
  &:hover ${floatingActionsClass} {
    display: block;
  }
`

TaskItem.propTypes = {
  selected: PropTypes.bool,
}

TaskItem.defaultProps = {
  selected: false,
}

export const TaskActionsGroup = styled(Group).attrs({
  vertical: true,
  className: 'pa2 bg-white-90 br3 shadow-1',
})``
