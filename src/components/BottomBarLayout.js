import React from 'react'

export function BottomBarLayout({ children, bottom }) {
  return (
    <div className="fdc-h-100">
      <div className="overflow-scroll">{children}</div>
      <div>{bottom}</div>
    </div>
  )
}
