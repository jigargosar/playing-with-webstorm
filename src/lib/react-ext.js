import React from 'react'
import cn from 'classname'
import { forEach } from 'ramda'

export const renderKeyedById = (Component, propName, list) =>
  list.map(model =>
    React.createElement(Component, {
      key: model.id,
      [propName]: model,
    }),
  )

export { cn }

export function chainEvent(...eventHandlers) {
  return function(event) {
    forEach(handler => handler(event))(eventHandlers)
  }
}
