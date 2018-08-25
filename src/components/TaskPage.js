import { createNewTaskWithDefaults, setDone } from '../models/Task'
import React from 'react'
import {
  compose,
  findIndex,
  lensPath,
  over,
  propEq,
  times,
  update,
} from 'ramda'
import { MainLayout } from './MainLayout'
import { TaskList } from './TaskList'
import { withStateHandlers } from 'recompose'
import { assert } from '../lib/assert'

const enhance = compose(
  withStateHandlers(
    { tasks: times(createNewTaskWithDefaults)(30) },
    {
      setDone: state => (done, task) =>
        over(lensPath(['tasks']))(tasks => {
          const taskIdx = findIndex(propEq('id', task.id))(tasks)
          assert(taskIdx !== -1)
          return update(taskIdx)(setDone(done, tasks[taskIdx]))(tasks)
        })(state),
    },
  ),
)

function TaskPage({ tasks, setDone }) {
  return (
    <MainLayout title={'FunDo'}>
      <TaskList tasks={tasks} actions={setDone} />
    </MainLayout>
  )
}

export default enhance(TaskPage)
