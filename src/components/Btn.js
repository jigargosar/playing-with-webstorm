import { tr, trCode, trLink } from '../GlobalStyles'
import Radium from 'radium'
import React from 'react'

const buttonStyle = {
  base: [
    {
      background: 'transparent',
      userSelect: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    trCode,
    tr['.mh1'],
    tr['.ph2'],
    trLink,
  ],
  warning: {
    ...tr['.orange'],
  },
}
export const Btn = Radium(function FloatingAction(props) {
  return <button style={[buttonStyle.base, buttonStyle.warning]} {...props} />
})
