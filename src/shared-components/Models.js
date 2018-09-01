import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

export const Models = observer(function Models({ models, children: render }) {
  return models.map((model, index) => (
    <Fragment key={model.id}>{render(model, index)}</Fragment>
  ))
})

Models.propTypes = {
  models: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
}
