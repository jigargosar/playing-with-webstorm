import React from 'react'
import {
  FullHeightContainer,
  ScrollContainer,
  ViewportHeightContainer,
} from './containers'
import { setDisplayName } from 'recompose'
import { compose } from 'ramda'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import { withStateReducer } from './withStateReducer'

function Task({ task: { id, title, done }, dispatch }) {
  return (
    <div
      className="mv2 pa3 br3 f4 white bg-light-purple "
      onClick={() => dispatch({ type: 'task.toggleDone', id })}
    >
      <div className={cn({ strike: done })}>{title}</div>
    </div>
  )
}

Task.propTypes = { task: PropTypes.object.isRequired }

function TaskList({ tasks, dispatch }) {
  return (
    <div className="measure-wide center">
      <div className="ma3 pa3 br3 bg-white shadow-1 ">
        <Models models={tasks}>
          {task => <Task task={task} dispatch={dispatch} />}
        </Models>
      </div>
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
        <div className="pa3 bb b--silver">STATIC HEADER</div>
        <ScrollContainer>
          <TaskList tasks={state.tasks} dispatch={dispatch} />
        </ScrollContainer>
        {/*<div className="ma1">STATIC Content</div>*/}
        {/*<div className="overflow-scroll ma3 ba b--silver">*/}
        {/*<div className="ma3 pa3 bg-light-purple">A</div>*/}
        {/*<div className="ma3 pa3 bg-light-blue">B</div>*/}
        {/*<div className="pa3 bg-light-red">C</div>*/}
        {/*<div className="pa3">D</div>*/}
        {/*<div className="pa3">E</div>*/}
        {/*</div>*/}
        <div className="pa3 bt b--silver">STATIC FOOTER</div>
      </ViewportHeightContainer>
    )
  })
