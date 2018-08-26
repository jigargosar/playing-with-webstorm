import React from 'react'
import { ScrollContainer, ViewportHeightContainer } from './containers'
import { setDisplayName } from 'recompose'
import { compose } from 'ramda'
import * as PropTypes from 'prop-types'
import { cn } from '../lib/react-ext'
import { Models } from '../shared-components/Models'
import { withStateReducer } from './withStateReducer'

function Task({ task: { id, title, done }, dispatch }) {
  return (
    <div className="mv2 flex items-center relative hide-child">
      <div
        className="flex items-center child absolute z-1  "
        style={{ right: '0rem' }}
      >
        <div className="absolute">
          <div className="ma1 lh-solid code shadow-1 pa2 br-pill bg-white-90">
            X
          </div>
          <div className="ma1 lh-solid code shadow-1 pa2 br-pill bg-white-90">
            X
          </div>
          <div className="ma1 lh-solid code shadow-1 pa2 br-pill bg-white-90">
            X
          </div>
        </div>
      </div>
      <div
        className="flex-auto pa2 f4 white bg-light-purple br3 hover-yellow shadow-hover"
        onClick={() => dispatch({ type: 'task.toggleDone', id })}
      >
        <div className={cn({ strike: done })}>{title}</div>
      </div>
    </div>
  )
}

Task.propTypes = { task: PropTypes.object.isRequired }

function TaskList({ tasks, dispatch }) {
  return (
    <div className="center measure-wide">
      <div className="ma3 pa3 br3 bg-white shadow-1 ">
        <div className="">Tasks</div>
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
      <ViewportHeightContainer className="bg-light-gray">
        <div className="pa3 shadow-1">STATIC HEADER</div>
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
        <div className="pa3 shadow-1">STATIC FOOTER</div>
      </ViewportHeightContainer>
    )
  })
