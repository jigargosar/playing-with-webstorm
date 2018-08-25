import React from 'react'
import 'tachyons'
import { MainLayout } from './components/MainLayout'
import { createTask, getTitle } from './models/Task'
import { partial, times } from 'ramda'
import { renderKeyedById } from './lib/react-ext'

function ListItemLayout({ spacing = 'pa2', children }) {
  return <div className={`${spacing} flex`}>{children}</div>
}
function TaskItem({ task }) {
  return <ListItemLayout>{getTitle(task)}</ListItemLayout>
}

function App() {
  const tasks = times(partial(createTask)([]))(30)
  return (
    <MainLayout title={'FunDo'}>
      <div className="flex flex-column">
        <div>{renderKeyedById(TaskItem, 'task', tasks)}</div>
        <div className="pa3 f2">footer</div>
      </div>
    </MainLayout>
  )
}

export default App
