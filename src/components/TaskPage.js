import { createNewTaskWithDefaults, setDone } from '../models/Task'
import React from 'react'
import { compose, partial, times } from 'ramda'
import { MainLayout } from './MainLayout'
import { TaskList } from './TaskList'
import { withProps, withStateHandlers } from 'recompose'
import { overModel } from '../models/TaskList'

const enhance = compose(
  withStateHandlers(
    { tasks: times(createNewTaskWithDefaults)(30) },
    {
      setDone: ({ tasks }) => (done, task) => ({
        tasks: overModel(task, partial(setDone, [done]), tasks),
      }),
    },
  ),
  withProps(setDone => ({ actions: { setDone } })),
)

function TaskPage({ tasks, actions }) {
  return (
    <MainLayout title={'FunDo'}>
      <TaskList tasks={tasks} actions={actions} />
    </MainLayout>
  )
}

export default enhance(TaskPage)
