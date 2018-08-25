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
function MainLayout({
  title = 'Playing With Webstorm',
  ...otherProps
}) {
  return (
    <DrawerLayout
      header={<div className={'f2 ma2'}>{title}</div>}
      // footer={<div className={"pa2 f4"}>fixed footer</div>}
      {...otherProps}
    />
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
