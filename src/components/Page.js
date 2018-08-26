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
  return models.map(model => (
    <Fragment key={model.id}>{render(model)}</Fragment>
  ))
}

Models.propTypes = {
  models: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
}

function TaskList(props) {
  return (
    <div className="ma3 ba b--silver">
      <Models models={props.models}>{props.prop1}</Models>
    </div>
  )
}

TaskList.propTypes = {
  models: PropTypes.any,
  prop1: PropTypes.func,
}
export const Page =
  //
  enhance(function Page({ state }) {
    return (
      <ViewportHeightContainer>
        <div className="ma1">STATIC HEADER</div>
        <div className="overflow-scroll">
          <TaskList
            models={state.tasks}
            prop1={task => <Task task={task} />}
          />
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
