import React from 'react'
import 'tachyons'
import { MainLayout } from './components/MainLayout'
import { createTask, getTitle } from './models/Task'
import { partial, times } from 'ramda'
import { renderKeyedById } from './lib/react-ext'

function TaskItem({ task }) {
  return (
    <div className={`pa2 flex`}>
      <div className="">{getTitle(task)}</div>
    </div>
  )
}

function App() {
  const tasks = times(partial(createTask)([]))(30)
  return (
    <MainLayout title={'FunDo'}>
      <div className="fc-h-100">
        <div className="overflow-scroll">
          {renderKeyedById(TaskItem, 'task', tasks)}
        </div>
        <div className="pa2 bt b--silver">footer</div>
      </div>
    </MainLayout>
  )
}

export default App
