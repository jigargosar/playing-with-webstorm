import React from 'react'

export const renderKeyedById = (Component, propName, list) =>
  list.map(model =>
    React.createElement(Component, {
      key: model.id,
      [propName]: model,
    }),
  )
