import { map, merge } from 'ramda'
import React, { Fragment } from 'react'

export function TaskActionBar() {
  const buttonProps = [
    { label: 'delete' },
    { label: 'done' },
    { label: 'add' },
  ].map(b => merge({ id: b.label }, b))
  return (
    <div className="pa2 frr bt b--silver">
      {map(({ id, label }) => (
        <Fragment key={id}>
          <div className="ph2">
            <button className="ph2">{label}</button>
          </div>
        </Fragment>
      ))(buttonProps)}
    </div>
  )
}
