import PropTypes from 'prop-types'
import { Base, styled } from 'reakit'
import { ifProp } from 'styled-tools'
import { primaryDark, primaryLight } from '../../../reakit-components'

export const Task = styled(Base).attrs({ className: 'mv2 pv2 br2' })`
  ${ifProp('hovered', { backgroundColor: primaryLight })};
  ${ifProp('selected', { color: '#fff', backgroundColor: primaryDark })};
`

Task.propTypes = {
  hovered: PropTypes.bool,
  selected: PropTypes.bool,
}

Task.defaultProps = {
  hovered: false,
  selected: false,
}
