import { createNewTaskWithDefaults, getTitle } from '../models/Task'
import React from 'react'
import { BottomBarLayout } from './BottomBarLayout'
import { TaskActionBar } from './TaskActionBar'
import { renderKeyedById } from '../lib/react-ext'
import { times } from 'ramda'
import { MainLayout } from './MainLayout'

function TaskItem({ task }) {
  return (
    <div className={`fdr iic`}>
      <div className="pa2 fa ba b--silver">{getTitle(task)}</div>
    </div>
  )
}

function TaskList({ tasks }) {
  return (
    <BottomBarLayout bottom={<TaskActionBar />}>
      {renderKeyedById(TaskItem, 'task', tasks)}
    </BottomBarLayout>
  )
}

export function TaskPage() {
  const tasks = times(createNewTaskWithDefaults)(30)
  return (
    <MainLayout title={'FunDo'}>
      <TaskList tasks={tasks} />
    </MainLayout>
  )
}
