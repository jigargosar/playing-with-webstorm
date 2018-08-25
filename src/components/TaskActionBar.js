import { identity, isNil, map } from 'ramda'
import React, { Fragment } from 'react'
import { isDone } from '../models/Task'

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
        if (isNil(task)) return
        actions.setDone(!isDone(task), task)
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
