import React, { Fragment } from 'react'
import * as PropTypes from 'prop-types'
import * as xr from 'mobx-react'
import { mapIndexedA, propS } from '../lib/ramda-strict'

export const Keyed = xr.observer(function Keyed({ list, getKey }) {
  return mapIndexedA((element, index) => (
    <Fragment key={getKey(element)}>{render(element, index)}</Fragment>
  ))(list)
})

Keyed.propTypes = {
  list: PropTypes.array.isRequired,
  getKey: PropTypes.func,
  comp: PropTypes.element.isRequired,
}

Keyed.defaultProps = {
  getKey: propS('id'),
}
