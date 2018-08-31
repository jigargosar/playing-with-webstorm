import React, { Fragment } from 'react'
import * as PropTypes from 'prop-types'
import { propS } from '../lib/ramda-strict'
import { observer } from 'mobx-react'
import { addIndex, always, compose, map, nth } from 'ramda'

export const Keyed = observer(function Keyed({
  list,
  getKey,
  as: Component,
  name,
  getProps,
  ...otherProps
}) {
  return addIndex(map)((element, index) => (
    <Fragment key={getKey(element, index)}>
      <Component {...otherProps} {...getProps(element, index, list)} />
    </Fragment>
  ))(list)
})

Keyed.propTypes = {
  list: PropTypes.array.isRequired,
  getKey: PropTypes.func,
  getProps: PropTypes.func,
  as: PropTypes.func.isRequired,
}

Keyed.defaultProps = {
  getKey: compose(
    propS('id'),
    nth(0),
  ),
  getProps: always({}),
}
