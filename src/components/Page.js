import React, { Fragment } from 'react'
import { ViewportHeightContainer } from './containers'
import { setDisplayName, withReducer } from 'recompose'
import { compose, times } from 'ramda'
import { createNewTaskWithDefaults } from '../models/Task'

// import cn from "classname";

function reducer(action, state) {
  return state
}

function initialState() {
  return {
    tasks: times(createNewTaskWithDefaults)(8),
  }
}

const enhance = compose(
  withReducer('state', 'dispatch', reducer, initialState()),
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
          {state.tasks.map(task => (
            <Fragment key={task.id}>
              <div className="ma3 pa3 bg-light-purple">
                {task.title}
              </div>
            </Fragment>
          ))}
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
