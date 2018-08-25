import React from 'react'
import 'tachyons'
import {DrawerLayout} from './shared-components/Drawerlayout'

function RepeatString({ value = 'default string', times = 30 }) {
  return (
    <div>
      {new Array(times).fill(value).map((s, i) => <div key={i}>{s}</div>)}
    </div>
  )
}
function HeaderContent() {
  return <div className={'f2 ma2'}>fixed header</div>
}

function App() {
  return (
    <DrawerLayout
      className="bg-near-white sans-serif"
      header={<HeaderContent />}
      // footer={<div className={"pa2 f4"}>fixed footer</div>}
      sidebar={<RepeatString value={'drawer item'} times={3} />}
      debug={false}
    >
      <RepeatString value={'main content items'} times={3} />
    </DrawerLayout>
  )
}

export default App
