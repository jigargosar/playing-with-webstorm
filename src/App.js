import React from 'react'
import 'tachyons'
import {MainLayout} from './components/MainLayout'
import {Task} from './models/Task'

function App() {
  return (
    <MainLayout title={'FunDo'}>
      {new Array(10)
        .fill(null)
        .map((s, i) => <div key={i}>{Task()}</div>)}
    </MainLayout>
  )
}

export default App
