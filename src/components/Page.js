import React from 'react'
import { ViewportHeightContainer } from './containers'
import { setDisplayName } from 'recompose'
import { compose } from 'ramda'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import { withStateReducer } from './withStateReducer'

function Task({ task: { id, title, done }, dispatch }) {
  return (
    <div
      className="ma3 pa3 white bg-light-purple"
      onClick={() => dispatch({ type: 'task.toggleDone', id })}
    >
      <div className={cn({ strike: done })}>{title}</div>
    </div>
  )
}
Task.propTypes = { task: PropTypes.object.isRequired }

function TaskList({ tasks, dispatch }) {
  return (
    <div className="ma3 ba b--silver">
      <Models models={tasks}>
        {task => <Task task={task} dispatch={dispatch} />}
      </Models>
    </div>
  )
}
TaskList.propTypes = {
  models: PropTypes.any,
  prop1: PropTypes.func,
}

const enhancePage = compose(
  withStateReducer(),
  setDisplayName('Page'),
)
export const Page =
  //
  enhancePage(function Page({ state, dispatch }) {
    return (
      <ViewportHeightContainer>
        <div className="ma1">STATIC HEADER</div>
        <div className="overflow-scroll">
          <TaskList tasks={state.tasks} dispatch={dispatch} />
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
