import { createNewTaskWithDefaults } from '../models/Task'
import React from 'react'
import { times } from 'ramda'
import { MainLayout } from './MainLayout'
import { TaskList } from './TaskList'

export function TaskPage() {
  const tasks = times(createNewTaskWithDefaults)(30)
  return (
    <MainLayout title={'FunDo'}>
      <TaskList tasks={tasks} />
    </MainLayout>
  )
}
