import React from 'react'
import { withProps } from 'recompose'
// import cn from "classname";

const FullHeightContainer = withProps({
  className: 'h-100 overflow-hidden flex flex-column',
})

export const Page = function Page() {
  return (
    <div className="vh-100">
      <FullHeightContainer>
        <h1>STATIC</h1>
        <div className="overflow-scroll pa3 ma3 ba b--silver">
          <div className="ma3 pa5 bg-light-purple">A</div>
          <div className="ma3 pa5 bg-light-blue">B</div>
          <div className="pa5 bg-light-red">C</div>
          <div className="pa5">D</div>
          <div className="pa5">E</div>
        </div>
        <h1>STATIC</h1>
      </FullHeightContainer>
    </div>
  )
}
