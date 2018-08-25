import React from 'react'
import 'tachyons'
import { MainLayout } from './components/MainLayout'
import { createTask, getTitle } from './models/Task'
import { map, partial, times } from 'ramda'

function TaskItem({ task }) {
  return <div>{getTitle(task)}</div>
}

const renderKeyedById = (Component, propName, list) =>
  map(model =>
    React.createElement(Component, {
      key: model.id,
      [propName]: model,
    }),
  )(list)

function App() {
  const tasks = times(partial(createTask)([]))(30)
  return (
    <MainLayout title={'FunDo'}>
      {renderKeyedById(TaskItem, 'task', tasks)}
    </MainLayout>
  )
}

export default App
