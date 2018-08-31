import React from 'react'
import PropTypes from 'prop-types'
import { Base, styled } from 'reakit'
import { ifProp } from 'styled-tools'
import { primaryDark, primaryLight } from '../../../reakit-components'

const TaskStyled = styled(Base)`
  ${ifProp('hovered', { backgroundColor: primaryLight })};
  ${ifProp('selected', { color: '#fff', backgroundColor: primaryDark })};
`

function Task({ selected, hovered, ...otherProps }) {
  return <TaskStyled className="mv2 pv2 br2" {...otherProps} />
}

Task.propTypes = {
  hovered: PropTypes.bool,
  selected: PropTypes.bool,
}

Task.defaultProps = {
  hovered: false,
  selected: false,
}
