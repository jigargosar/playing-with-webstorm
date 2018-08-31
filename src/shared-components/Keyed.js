import React, { Fragment } from 'react'
import * as PropTypes from 'prop-types'
import { mapIndexedA, propS } from '../lib/ramda-strict'
import { observer } from 'mobx-react'

export const Keyed = observer(function Keyed({
  list,
  getKey,
  as: Component,
  name,
  ...otherProps
}) {
  return mapIndexedA((element, index) => (
    <Fragment key={getKey(element, index)}>
      <Component {...{ [name]: element }} {...otherProps} />
    </Fragment>
  ))(list)
})

Keyed.propTypes = {
  list: PropTypes.array.isRequired,
  getKey: PropTypes.func,
  as: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

Keyed.defaultProps = {
  getKey: propS('id'),
}
