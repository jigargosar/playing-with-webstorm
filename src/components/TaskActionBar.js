import { identity, isNil, map, unless } from 'ramda'
import React, { Fragment } from 'react'

function renderButton(label, handleClick) {
  return (
    <div className="ph2">
      <button onClick={handleClick} className="ph2">
        {label}
      </button>
    </div>
  )
}

export function TaskActionBar({ queries, actions }) {
  const task = queries.selectedTask

  const buttonProps = [
    { label: 'add', handleClick: identity },
    {
      label: 'done',
      handleClick: () => {
        unless(isNil)(actions.onTaskToggleDone)(task)
      },
    },
    { label: 'delete', handleClick: identity },
  ]
  return (
    <div className="pa2 frr bt b--silver">
      {map(({ label, handleClick }) => (
        <Fragment key={label}>
          {renderButton(label, handleClick)}
        </Fragment>
      ))(buttonProps)}
    </div>
  )
}
