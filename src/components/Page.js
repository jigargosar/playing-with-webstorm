import React from 'react'
// import cn from "classname";

export const Page = function Page() {
  return (
    <div className="vh-100">
      <div className="h-100 overflow-hidden flex flex-column">
        <h1>STATIC</h1>
        <div className="overflow-scroll pa3 ma3 ba b--silver">
          <div className="ma3 pa5 bg-light-purple">A</div>
          <div className="ma3 pa5 bg-light-blue">B</div>
          <div className="pa5 bg-light-red">C</div>
          <div className="pa5">D</div>
          <div className="pa5">E</div>
        </div>
        <h1>STATIC</h1>
      </div>
    </div>
  )
}
