import { createNewTaskWithDefaults } from '../models/Task'
import React from 'react'
import { compose, times } from 'ramda'
import { MainLayout } from './MainLayout'
import { TaskList } from './TaskList'
import { withStateHandlers } from 'recompose'

const enhance = compose(withStateHandlers)

function TaskPage() {
  const tasks = times(createNewTaskWithDefaults)(30)
  return (
    <MainLayout title={'FunDo'}>
      <TaskList tasks={tasks} />
    </MainLayout>
  )
}

export default enhance(TaskPage)
