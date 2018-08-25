import React from 'react'
import 'tachyons'
import {MainLayout} from './components/MainLayout'

function RepeatString({ value = 'default string', times = 30 }) {
  return (
    <div>
      {new Array(times)
        .fill(value)
        .map((s, i) => <div key={i}>{s}</div>)}
    </div>
  )
}

function App() {
  return (
    <MainLayout title={'FunDo'}>
      <RepeatString value={'main content items'} times={3} />
    </MainLayout>
  )
}

export default App
