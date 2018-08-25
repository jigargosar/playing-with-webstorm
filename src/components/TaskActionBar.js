import { map } from 'ramda'
import React, { Fragment } from 'react'

function renderButton(label) {
  return (
    <div className="ph2">
      <button className="ph2">{label}</button>
    </div>
  )
}

export function TaskActionBar() {
  const buttonProps = [
    { label: 'add' },
    { label: 'done' },
    { label: 'delete' },
  ]
  return (
    <div className="pa2 frr bt b--silver">
      {map(({ label }) => (
        <Fragment key={label}>{renderButton(label)}</Fragment>
      ))(buttonProps)}
    </div>
  )
}
