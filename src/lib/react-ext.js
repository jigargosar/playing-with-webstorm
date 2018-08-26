import React from 'react'
import cn from 'classname'

export const renderKeyedById = (Component, propName, list) =>
  list.map(model =>
    React.createElement(Component, {
      key: model.id,
      [propName]: model,
    }),
  )

export { cn }
