import React, {Fragment} from 'react'
import 'tachyons'
import {MainLayout} from './components/MainLayout'
import {createTask, getTitle} from './models/Task'
import {map, partial, times} from 'ramda'


function TaskItem({task}) {
  return <div>{getTitle(task)}</div>
}

function App() {
  const tasks = times(partial(createTask)([]))(30)
  return (
    <MainLayout title={'FunDo'}>
      {map(t => <Fragment key={t.id}><TaskItem task={t}/></Fragment>)(30)}
    </MainLayout>
  )
}

export default App
