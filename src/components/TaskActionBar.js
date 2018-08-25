import { map, merge } from 'ramda'
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
  ].map(b => merge({ id: b.label }, b))
  return (
    <div className="pa2 frr bt b--silver">
      {map(({ id, label }) => (
        <Fragment key={id}>{renderButton(label)}</Fragment>
      ))(buttonProps)}
    </div>
  )
}
