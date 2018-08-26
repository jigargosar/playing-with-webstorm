import React, { Fragment } from 'react'
import { ViewportHeightContainer } from './containers'
import { setDisplayName, withReducer } from 'recompose'
import { compose, times } from 'ramda'
import { createNewTaskWithDefaults } from '../models/Task'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'

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

function Task({ task: { title, done } }) {
  return (
    <div className="ma3 pa3 white bg-light-purple">
      <div className={cn({ strike: done })}>{title}</div>
    </div>
  )
}

Task.propTypes = { task: PropTypes.object.isRequired }

function Models({ models, children: render }) {
  return (
    <div className="overflow-scroll ma3 ba b--silver">
      {models.map(model => (
        <Fragment key={model.id}>{render(model)}</Fragment>
      ))}
    </div>
  )
}

Models.propTypes = {
  models: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
}
export const Page =
  //
  enhance(function Page({ state }) {
    return (
      <ViewportHeightContainer>
        <header>
          <div>STATIC HEADER</div>
        </header>
        <Models models={state.tasks}>
          {task => <Task task={task} />}
        </Models>
        <header>
          <div>STATIC Content</div>
        </header>
        <div className="overflow-scroll ma3 ba b--silver">
          <div className="ma3 pa3 bg-light-purple">A</div>
          <div className="ma3 pa3 bg-light-blue">B</div>
          <div className="pa3 bg-light-red">C</div>
          <div className="pa3">D</div>
          <div className="pa3">E</div>
        </div>
        <footer>
          <div>STATIC FOOTER</div>
        </footer>
      </ViewportHeightContainer>
    )
  })
