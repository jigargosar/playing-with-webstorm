import { tr, trLink } from '../GlobalStyles'
import Radium from 'radium'
import React from 'react'

const buttonStyle = {
  base: [
    // tr['.button-reset'],
    tr['.code'],
    tr['.ma1'],
    tr['.pa1'],
    {
      background: 'transparent',
      userSelect: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    trLink,
  ],
  warning: {
    ...tr['.orange'],
  },
}
export const Btn = Radium(function FloatingAction(props) {
  return <button style={[buttonStyle.base, buttonStyle.warning]} {...props} />
})
