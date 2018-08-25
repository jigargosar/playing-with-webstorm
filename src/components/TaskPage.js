import { createNewTaskWithDefaults, setDone } from '../models/Task'
import React from 'react'
import {
  compose,
  curry,
  defaultTo,
  eqProps,
  head,
  times,
} from 'ramda'
import { MainLayout } from './MainLayout'
import { TaskList } from './TaskList'
import { withProps, withState } from 'recompose'
import { findById, overModel } from '../models/TaskList'

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
        findById(selectedTaskId),
      )(tasks)
      return {
        queries: {
          isTaskSelected: eqProps('id', selectedTask),
          selectedTask,
          tasks,
        },
        actions: {
          setDone: curry((done, task) =>
            updateTasks(overModel(task, setDone(done))),
          ),
          onTaskFocus: ({ id }) => () => {
            updateSelectedTaskId(id)
            updateFocusedTaskId(id)
          },
          onTaskBlur: ({ id }) => () => {
            if (id !== focusedTaskId) return
            updateFocusedTaskId(null)
          },
        },
      }
    },
  ),
)

function TaskPage({ queries, actions }) {
  return (
    <MainLayout title={'FunDo'}>
      <TaskList queries={queries} actions={actions} />
    </MainLayout>
  )
}

export default enhance(TaskPage)
