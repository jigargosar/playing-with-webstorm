import React from 'react'
import 'tachyons'
import {MainLayout} from './components/MainLayout'
import {randomWords} from "./lib/fake";


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
      <RepeatString times={3} />
    </MainLayout>
  )
}

export default App
