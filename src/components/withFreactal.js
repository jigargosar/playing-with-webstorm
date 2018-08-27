import { injectState, provideState, update } from 'freactal'
import {
  findIndexById,
  overItemInListWithId,
  rejectById,
} from '../lib/ramda-ext'
import { createNewTaskWithDefaults, toggleTaskDone } from '../models/Task'
import { equals, path, prop, times } from 'ramda'

export { injectState }

export const withAppState = provideState({
  initialState: () => ({
    tasks: times(createNewTaskWithDefaults)(8),
    selectedTaskIdx: 0,
  }),
  computed: {
    firstTask: path(['tasks', 0]),
    selectedTask: ({ tasks, selectedTaskIdx, firstTask }) =>
      tasks[selectedTaskIdx] || firstTask,
    selectedTaskId: path(['selectedTask', 'id']),
    isTaskSelected: ({ selectedTaskId }) => equals(selectedTaskId),
  },
  effects: {
    toggleTaskDone: (effects, id) =>
      overItemInListWithId(id)(toggleTaskDone)('tasks'),
    toggleSelectedTaskDone: effects => ({ selectedTaskIdx, tasks }) => {
      const id = prop('id')(tasks[selectedTaskIdx] || tasks[0])
      return effects.toggleTaskDone(id)
    },
    deleteTask: update((state, id) => ({
      tasks: rejectById(id)(state.tasks),
    })),
    selectTaskWithId: update((state, id) => ({
      selectedTaskIdx: findIndexById(id)(state.tasks),
    })),
  },
})
