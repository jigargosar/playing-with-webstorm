import Radium from 'radium'
import React from 'react'
import { secondaryColor } from '../theme'

const buttonStyle = {
  base: [
    {
      background: 'transparent',
      userSelect: 'none',
      border: 'none',
      cursor: 'pointer',
    },
  ],
  warning: [secondaryColor],
}
export const Btn = Radium(function FloatingAction(props) {
  return (
    <button
      className={'code mh1 ph1'}
      style={[buttonStyle.base, buttonStyle.warning]}
      {...props}
    />
  )
})
