import {
  createNewTaskWithDefaults,
  setTaskDone,
} from '../models/Task'
import React from 'react'
import {
  compose,
  curry,
  defaultTo,
  eqProps,
  head,
  isNil,
  propOr,
  times,
} from 'ramda'
import { MainLayout } from './MainLayout'
import { TaskList } from './TaskList'
import { withProps, withState } from 'recompose'
import { findById, overModel } from '../models/TaskList'
import { HotKeys } from 'react-hotkeys'

const enhance = compose(
  withState(
    'tasks',
    'updateTasks',
    times(createNewTaskWithDefaults)(30),
  ),
  withState('selectedTaskId', 'updateSelectedTaskId', null),
  withState('focusedTaskId', 'updateFocusedTaskId', null),
  withProps(
    ({
      tasks,
      updateTasks,
      selectedTaskId,
      updateSelectedTaskId,
      focusedTaskId,
      updateFocusedTaskId,
    }) => {
      const selectedTask = compose(
        defaultTo(head(tasks)),
        defaultTo(findById(focusedTaskId)(tasks)),
        findById(selectedTaskId),
      )(tasks)
      const updateTaskDone = curry((done, task) =>
        updateTasks(overModel(task, setTaskDone(done))),
      )
      return {
        queries: {
          isTaskSelected: eqProps('id', selectedTask),
          selectedTask,
          focusedTask: defaultTo(null)(
            findById(focusedTaskId)(tasks),
          ),
          tasks,
        },
        actions: {
          setDone: updateTaskDone,
          onTaskDoneChange: task => e =>
            updateTaskDone(e.target.checked, task),
          onTaskFocus: ({ id }) => () => {
            updateSelectedTaskId(id)
            updateFocusedTaskId(id)
          },
          onTaskBlur: ({ id }) => () => {
            if (id !== focusedTaskId) return
            updateFocusedTaskId(null)
          },
          handleGlobalKeyDown: e => {},
          onTaskToggleDone: task => (e = {}) => {
            const code = propOr(null, 'code')(e)
            if (code === 'Space') {
              console.log(e)
              e.preventDefault()
            }
            updateTaskDone(!task.done, task)
          },
        },
      }
    },
  ),
)

function TaskPage({ queries, actions }) {
  const keyMap = {
    navigateNext: 'down',
    navigatePrev: 'up',
    deleteTask: ['d'],
    toggleDone: [
      'x',
      ...(isNil(queries.focusedTask) ? ['space'] : []),
    ],
  }

  return (
    <HotKeys keyMap={keyMap}>
      <MainLayout
        title={'FunDo'}
        onKeyDown={actions.handleGlobalKeyDown}
      >
        <TaskList queries={queries} actions={actions} />
      </MainLayout>
    </HotKeys>
  )
}

export default enhance(TaskPage)
