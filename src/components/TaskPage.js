import { createNewTaskWithDefaults, setDone } from '../models/Task'
import React from 'react'
import { compose, times } from 'ramda'
import { MainLayout } from './MainLayout'
import { TaskList } from './TaskList'
import { withHandlers, withProps, withState } from 'recompose'
import { overModel } from '../models/TaskList'

const enhance = compose(
  withState(
    'tasks',
    'updateTasks',
    times(createNewTaskWithDefaults)(30),
  ),
  withHandlers({
    setDone: ({ updateTasks }) => (done, task) =>
      updateTasks(overModel(task, setDone(done))),
  }),
  withProps(({ setDone }) => ({ actions: { setDone } })),
)

function TaskPage({ tasks, actions }) {
  return (
    <MainLayout title={'FunDo'}>
      <TaskList tasks={tasks} actions={actions} />
    </MainLayout>
  )
}

export default enhance(TaskPage)
