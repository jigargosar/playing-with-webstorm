import PropTypes from 'prop-types'
import { Base, css, Fit, Group, styled } from 'reakit'
import { ifProp } from 'styled-tools'
import { primaryDark, primaryLight } from '../../../reakit-components'

export const TaskItem = styled(Base).attrs({ className: 'mv2 pv2 br2' })`
  position: relative;
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

  &:not(:hover) .hide-unless-parent-hovered {
    display: none;
  }
`

TaskItem.propTypes = {
  selected: PropTypes.bool,
}

TaskItem.defaultProps = {
  selected: false,
}

export const TaskHoverActionsContent = styled(Group).attrs({
  vertical: true,
  className: 'pa2 bg-white-90 br3 shadow-1',
})`
  position: absolute;
`

export const TaskHoverActions = styled(Fit).attrs({
  className: 'hide-unless-parent-hovered',
})`
  z-index: 1;
  left: calc(100% - 3rem);
  top: -50%;
`
