import { map } from 'ramda'
import React from 'react'

export const renderKeyedById = (Component, propName, list) =>
  map(model =>
    React.createElement(Component, {
      key: model.id,
      [propName]: model,
    }),
  )(list)
