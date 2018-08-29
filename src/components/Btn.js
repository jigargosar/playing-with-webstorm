import React from 'react'

export const Btn = function FloatingAction(props) {
  return (
    <button
      className={'code mh1 ph1 orange link'}
      style={{
        background: 'transparent',
        userSelect: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
      {...props}
    />
  )
}
