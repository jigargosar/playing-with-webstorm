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

function ContentWithFixed() {}

function App() {
  const tasks = times(partial(createTask)([]))(30)
  return (
    <MainLayout title={'FunDo'}>
      <div className="flex flex-column h-100 ">
        <div className="overflow-scroll">
          {renderKeyedById(TaskItem, 'task', tasks)}
        </div>
        <div className="">footer</div>
      </div>
    </MainLayout>
  )
}

export default App
