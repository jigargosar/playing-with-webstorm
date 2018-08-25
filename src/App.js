import React from 'react'

import { MainLayout } from './components/MainLayout'
import { createNewTaskWithDefaults, getTitle } from './models/Task'
import { times } from 'ramda'
import { renderKeyedById } from './lib/react-ext'
import { TaskActionBar } from './components/TaskActionBar'

function TaskItem({ task }) {
  return (
    <div className={`fdr iic`}>
      <div className="pa2 fa ba b--silver">{getTitle(task)}</div>
    </div>
  )
}

function BottomBarLayout({ children, bottom }) {
  return (
    <div className="fdc-h-100">
      <div className="overflow-scroll">{children}</div>
      <div>{bottom}</div>
    </div>
  )
}

function App() {
  const tasks = times(createNewTaskWithDefaults)(30)

  return (
    <MainLayout title={'FunDo'}>
      <BottomBarLayout bottom={<TaskActionBar />}>
        {renderKeyedById(TaskItem, 'task', tasks)}
      </BottomBarLayout>
    </MainLayout>
  )
}

export default App
