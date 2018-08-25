import React from 'react'

import { MainLayout } from './components/MainLayout'
import { createTask, getTitle } from './models/Task'
import { partial, times } from 'ramda'
import { renderKeyedById } from './lib/react-ext'

function TaskItem({ task }) {
  return (
    <div className={`fdr`}>
      <div className="pa2 fa ba b--silver">{getTitle(task)}</div>
    </div>
  )
}

function App() {
  const tasks = times(partial(createTask)([]))(30)
  return (
    <MainLayout title={'FunDo'}>
      <div className="fdc-h-100">
        <div className="overflow-scroll">
          {renderKeyedById(TaskItem, 'task', tasks)}
        </div>
        <div className="pa2 bt b--silver">b1,b2,b3</div>
      </div>
    </MainLayout>
  )
}

export default App
