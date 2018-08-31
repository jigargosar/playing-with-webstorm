import React from 'react'
import PropTypes from 'prop-types'
import { Base } from 'reakit'
import { primaryDark, primaryLight } from '../../../reakit-components'

function Task({ selected, hovered, ...otherProps }) {
  return (
    <Base
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
