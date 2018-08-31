import * as PropTypes from 'prop-types'
import React from 'react'
import { composeHOC } from '../../composeHOC'
import { Base } from 'reakit'
import cn from 'classname'
import { primaryDark, primaryLight } from '../../../reakit-components'

export const Task = composeHOC()(function Task({
  selected,
  hovered,
  ...otherProps
}) {
  return (
    <Base
      className={cn('mv2 pv2 br2')}
      {...(selected
        ? { color: '#fff', backgroundColor: primaryDark }
        : hovered
          ? { backgroundColor: primaryLight }
          : {})}
      {...otherProps}
    />
  )
})
Task.propTypes = {
  hovered: PropTypes.bool,
  selected: PropTypes.bool,
}
