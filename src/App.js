import React from 'react'
import 'tachyons'
import { MainLayout } from './components/MainLayout'
import { createTask, getTitle } from './models/Task'
import { partial, times } from 'ramda'
import { renderKeyedById } from './lib/react-ext'

function ListItem({ children }) {
  return <div>{children}</div>
}

function TaskItem({ task }) {
  return <ListItem>{getTitle(task)}</ListItem>
}

function App() {
  const tasks = times(partial(createTask)([]))(30)
  return (
    <MainLayout title={'FunDo'}>
      {renderKeyedById(TaskItem, 'task', tasks)}
    </MainLayout>
  )
}

export default App
