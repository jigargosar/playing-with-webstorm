import React from 'react'

import { MainLayout } from './components/MainLayout'
import { createTask, getTitle } from './models/Task'
import { map, merge, partial, times } from 'ramda'
import { renderKeyedById } from './lib/react-ext'

function TaskItem({ task }) {
  return (
    <div className={`fdr iic`}>
      <div className="pa2 fa ba b--silver">{getTitle(task)}</div>
    </div>
  )
}

function BottomActionBar({ b }) {
  return (
    <div className="ph2">
      <button className="ph2">{b.label}</button>
    </div>
  )
}

function App() {
  const tasks = times(partial(createTask)([]))(30)
  const buttons = [
    { label: 'delete' },
    { label: 'done' },
    { label: 'add' },
  ].map(b => merge({ id: b.label }, b))
  return (
    <MainLayout title={'FunDo'}>
      <div className="fdc-h-100">
        <div className="overflow-scroll">
          {renderKeyedById(TaskItem, 'task', tasks)}
        </div>
        <div className="frr ">
          {map(b => <BottomActionBar key={b} b={b} />)(buttons)}
        </div>
      </div>
    </MainLayout>
  )
}

export default App
