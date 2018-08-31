import React from 'react'
import PropTypes from 'prop-types'
import { Base, styled } from 'reakit'
import { primaryDark, primaryLight } from '../../../reakit-components'

const TaskStyled = styled(Base)``

function Task({ selected, hovered, ...otherProps }) {
  return (
    <TaskStyled
      className="mv2 pv2 br2"
      {...(selected
        ? { color: '#fff', backgroundColor: primaryDark }
        : hovered
          ? { backgroundColor: primaryLight }
          : {})}
      {...otherProps}
    />
  )
}

Task.propTypes = {
  hovered: PropTypes.bool,
  selected: PropTypes.bool,
}

Task.defaultProps = {
  hovered: false,
  selected: false,
}
