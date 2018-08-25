import { BottomBarLayout } from './BottomBarLayout'
import { TaskActionBar } from './TaskActionBar'
import { renderKeyedById } from '../lib/react-ext'
import React from 'react'
import { getTitle } from '../models/Task'

function TaskItem({ task }) {
  return (
    <div className={`fdr iic`}>
      <div className="pa2 fa ba b--silver">{getTitle(task)}</div>
    </div>
  )
}

export function TaskList({ tasks }) {
  return (
    <BottomBarLayout bottom={<TaskActionBar />}>
      {renderKeyedById(TaskItem, 'task', tasks)}
    </BottomBarLayout>
  )
}
