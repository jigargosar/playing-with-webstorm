import React from 'react'
import 'tachyons'
import {MainLayout} from './components/MainLayout'
import {randomWords} from './lib/fake'
import {Task} from './models/Task'

function RepeatString({ times = 30 }) {
  return (
    <div>
      {new Array(times)
        .fill(null)
        .map((s, i) => <div key={i}>{randomWords()}</div>)}
    </div>
  )
}

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
