import React from 'react'
import { ViewportHeightContainer } from './containers'
// import cn from "classname";

export const Page = function Page() {
  return (
    <ViewportHeightContainer>
      <h1>STATIC</h1>
      <div className="overflow-scroll ma3 ba b--silver">
        <div className="ma3 pa5 bg-light-purple">A</div>
        <div className="ma3 pa5 bg-light-blue">B</div>
        <div className="pa5 bg-light-red">C</div>
        <div className="pa5">D</div>
        <div className="pa5">E</div>
      </div>
      <h1>STATIC</h1>
    </ViewportHeightContainer>
  )
}
