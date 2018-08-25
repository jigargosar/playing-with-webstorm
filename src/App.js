import React from 'react'

import { MainLayout } from './components/MainLayout'
import { createNewTaskWithDefaults, getTitle } from './models/Task'
import { map, merge, times } from 'ramda'
import { renderKeyedById } from './lib/react-ext'

function TaskItem({ task }) {
  return (
    <div className={`fdr iic`}>
      <div className="pa2 fa ba b--silver">{getTitle(task)}</div>
    </div>
  )
}

function BottomActionButton({ label, ...otherProps }) {
  return (
    <div className="ph2">
      <button className="ph2" {...otherProps}>
        {label}
      </button>
    </div>
  )
}

function BottomActionBar() {
  const buttonProps = [
    { label: 'delete' },
    { label: 'done' },
    { label: 'add' },
  ].map(b => merge({ id: b.label }, b))
  return (
    <div className="pa2 frr bt b--silver">
      {map(({ id, label }) => (
        <BottomActionButton key={id} label={label} />
      ))(buttonProps)}
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
      <BottomBarLayout bottom={<BottomActionBar />}>
        {renderKeyedById(TaskItem, 'task', tasks)}
      </BottomBarLayout>
    </MainLayout>
  )
}

export default App
