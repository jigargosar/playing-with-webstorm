import React, { Fragment } from 'react'
import * as PropTypes from 'prop-types'

export function Models({ models, children: render }) {
  return models.map((model, index) => (
    <Fragment key={model.id}>{render(model, index)}</Fragment>
  ))
}

Models.propTypes = {
  models: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
}
