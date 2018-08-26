import React from 'react'
import { ViewportHeightContainer } from './containers'
import { setDisplayName, withReducer } from 'recompose'
import { compose, times } from 'ramda'
import { createNewTaskWithDefaults } from '../models/Task'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'

function Task({ task: { title, done } }) {
  return (
    <div className="ma3 pa3 white bg-light-purple">
      <div className={cn({ strike: done })}>{title}</div>
    </div>
  )
}
Task.propTypes = { task: PropTypes.object.isRequired }

function TaskList({ tasks }) {
  return (
    <div className="ma3 ba b--silver">
      <Models models={tasks}>{task => <Task task={task} />}</Models>
    </div>
  )
}
TaskList.propTypes = {
  models: PropTypes.any,
  prop1: PropTypes.func,
}

function reducer(action, state) {
  return state
}

function initialState() {
  return {
    tasks: times(createNewTaskWithDefaults)(8),
  }
}

const enhancePage = compose(
  withReducer('state', 'dispatch', reducer, initialState()),
  setDisplayName('Page'),
)
export const Page =
  //
  enhancePage(function Page({ state }) {
    return (
      <ViewportHeightContainer>
        <div className="ma1">STATIC HEADER</div>
        <div className="overflow-scroll">
          <TaskList tasks={state.tasks} />
        </div>
        <div className="ma1">STATIC Content</div>
        <div className="overflow-scroll ma3 ba b--silver">
          <div className="ma3 pa3 bg-light-purple">A</div>
          <div className="ma3 pa3 bg-light-blue">B</div>
          <div className="pa3 bg-light-red">C</div>
          <div className="pa3">D</div>
          <div className="pa3">E</div>
        </div>
        <div className="ma1">STATIC FOOTER</div>
      </ViewportHeightContainer>
    )
  })
