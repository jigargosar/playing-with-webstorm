import React from 'react'
import 'tachyons'
import { MainLayout } from './components/MainLayout'
import { createTask, getTitle } from './models/Task'
import { partial, times } from 'ramda'
import { renderKeyedById } from './lib/react-ext'

function ListItemLayout({ children }) {
  return <div className="pa2 flex">{children}</div>
}

function TaskItem({ task }) {
  return <ListItemLayout>{getTitle(task)}</ListItemLayout>
}

function ListLayout({ children }) {
  return <div>{children}</div>
}

function App() {
  const tasks = times(partial(createTask)([]))(30)
  return (
    <MainLayout title={'FunDo'}>
      <ListLayout>
        {renderKeyedById(TaskItem, 'task', tasks)}
      </ListLayout>
    </MainLayout>
  )
}

export default App
