import React from 'react'
import { ViewportHeightContainer } from './containers'
import { setDisplayName, withReducer } from 'recompose'
import { compose } from 'ramda'

// import cn from "classname";

function reducer(action, state) {
  return state
}

const enhance = compose(
  withReducer('state', 'dispatch', reducer),
  setDisplayName('Page'),
)

export const Page =
  //
  enhance(function Page() {
    return (
      <ViewportHeightContainer>
        <header>
          <h1>STATIC HEADER</h1>
        </header>
        <div className="overflow-scroll ma3 ba b--silver">
          <div className="ma3 pa3 bg-light-purple">A</div>
          <div className="ma3 pa3 bg-light-blue">B</div>
          <div className="pa3 bg-light-red">C</div>
          <div className="pa3">D</div>
          <div className="pa3">E</div>
        </div>
        <header>
          <h1>STATIC Content</h1>
        </header>
        <div className="overflow-scroll ma3 ba b--silver">
          <div className="ma3 pa3 bg-light-purple">A</div>
          <div className="ma3 pa3 bg-light-blue">B</div>
          <div className="pa3 bg-light-red">C</div>
          <div className="pa3">D</div>
          <div className="pa3">E</div>
        </div>
        <footer>
          <h1>STATIC FOOTER</h1>
        </footer>
      </ViewportHeightContainer>
    )
  })
