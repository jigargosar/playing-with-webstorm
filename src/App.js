import React from 'react'
import 'tachyons'
import {MainLayout} from './components/MainLayout'
import {getTitle, Task} from './models/Task'
import {times} from 'ramda'

function App() {
  const tasks = times(() => Task())(30)
  return (
    <MainLayout title={'FunDo'}>
      {times(i => <div key={i}>{getTitle(Task())}</div>)(30)}
    </MainLayout>
  )
}

export default App
