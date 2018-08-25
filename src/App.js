import React from 'react'

import { MainLayout } from './components/MainLayout'
import { createNewTaskWithDefaults, getTitle } from './models/Task'
import { times } from 'ramda'
import { renderKeyedById } from './lib/react-ext'
import { TaskActionBar } from './components/TaskActionBar'
import { BottomBarLayout } from './components/BottomBarLayout'

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

function App() {
  const tasks = times(createNewTaskWithDefaults)(30)

  return (
    <MainLayout title={'FunDo'}>
      <TaskList tasks={tasks} />
    </MainLayout>
  )
}

export default App
