import React from 'react'
// import cn from "classname";

export const Page = function Page() {
  return (
    <div className="vh-100">
      <div className="h-100 overflow-hidden flex flex-column">
        <h1>STATIC</h1>
        <div className="overflow-scroll">
          <div className="pa5">A</div>
          <div className="pa5">B</div>
          <div className="pa5">C</div>
          <div className="pa5">D</div>
          <div className="pa5">E</div>
        </div>
        <h1>STATIC</h1>
      </div>
    </div>
  )
}
