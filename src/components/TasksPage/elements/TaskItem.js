import PropTypes from 'prop-types'
import { Base, Group, Hidden, styled } from 'reakit'
import { ifProp } from 'styled-tools'
import { Flex, primaryDark, primaryLight } from '../../../reakit-components'

export const TaskItem = styled(Base).attrs({ className: 'mv2 pv2 br2' })`
  ${ifProp('hovered', { backgroundColor: primaryLight })};
  ${ifProp('selected', { color: '#fff', backgroundColor: primaryDark })};
`

TaskItem.propTypes = {
  hovered: PropTypes.bool,
  selected: PropTypes.bool,
}

TaskItem.defaultProps = {
  hovered: false,
  selected: false,
}

export const TaskItemContent = styled(Flex)`
  flex-direction: row;
  align-items: center;
  position: relative;
`
export const TaskFloatingActions = styled(Hidden)`
  position: absolute;
  right: -4rem;
  z-index: 1;
`
export const TaskFloatingActionsContent = styled(Group).attrs({
  vertical: true,
  className: 'pa2 bg-white-90 br3 shadow-1',
})`
  position: relative;
`
