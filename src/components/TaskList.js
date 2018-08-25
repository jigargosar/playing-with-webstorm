import { BottomBarLayout } from './BottomBarLayout'
import { TaskActionBar } from './TaskActionBar'
import React from 'react'
import { getTitle, isDone } from '../models/Task'

function TaskItem({ task, actions }) {
  const done = isDone(task)
  const onDoneChange = e => actions.setDone(e.target.checked, task)

  return (
    <div className={`fdr iic`}>
      <div className="pa2">
        <input
          type="checkbox"
          checked={done}
          onChange={onDoneChange}
        />
      </div>
      <div className="pa2 fa ba b--silver">{getTitle(task)}</div>
    </div>
  )
}

export function TaskList({ tasks, actions }) {
  return (
    <BottomBarLayout bottom={<TaskActionBar />}>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} actions={actions} />
      ))}
    </BottomBarLayout>
  )
}
