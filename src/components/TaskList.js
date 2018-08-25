import { BottomBarLayout } from './BottomBarLayout'
import { TaskActionBar } from './TaskActionBar'
import React from 'react'
import { getTitle, isDone } from '../models/Task'
import cn from 'classname'

function TaskItem({ task, queries, actions }) {
  const done = isDone(task)
  const onDoneChange = e => actions.setDone(e.target.checked, task)

  const selected = queries.isTaskSelected(task)
  const setSelectedTaskHandler = () => actions.setSelectedTask(task)
  return (
    <div
      className={`fdr iic` + cn({ 'bg-light-blue': selected })}
      onClick={setSelectedTaskHandler}
    >
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

export function TaskList({ tasks, queries, actions }) {
  return (
    <BottomBarLayout bottom={<TaskActionBar />}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          queries={queries}
          actions={actions}
        />
      ))}
    </BottomBarLayout>
  )
}
