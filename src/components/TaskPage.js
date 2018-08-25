import { createNewTaskWithDefaults, setDone } from '../models/Task'
import React from 'react'
import { compose, times } from 'ramda'
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
  withProps(
    ({
      tasks,
      updateTasks,
      selectedTaskId,
      updateSelectedTaskId,
    }) => ({
      queries: {
        isTaskSelected: ({ id }) => id === selectedTaskId,
        selectedTask: findById(selectedTaskId)(tasks),
      },
      actions: {
        setDone: (done, task) =>
          updateTasks(overModel(task, setDone(done))),
        setSelectedTask: ({ id }) => updateSelectedTaskId(id),
      },
    }),
  ),
)

function TaskPage({ tasks, queries, actions }) {
  return (
    <MainLayout title={'FunDo'}>
      <TaskList tasks={tasks} queries={queries} actions={actions} />
    </MainLayout>
  )
}

export default enhance(TaskPage)
