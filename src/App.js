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

function Button({ label }) {
  return (
    <div className="ph2">
      <button className="ph2">{label}</button>
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
  const tasks = times(partial(createTask)([]))(30)
  const buttons = [
    { label: 'delete' },
    { label: 'done' },
    { label: 'add' },
  ].map(b => merge({ id: b.label }, b))
  return (
    <MainLayout title={'FunDo'}>
      <BottomBarLayout
        bottom={
          <div className="pa2 frr bt b--silver">
            {map(({ id, label }) => (
              <Button key={id} label={label} />
            ))(buttons)}
          </div>
        }
      >
        {renderKeyedById(TaskItem, 'task', tasks)}
      </BottomBarLayout>
    </MainLayout>
  )
}

export default App
