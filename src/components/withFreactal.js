import { injectState, provideState, update } from 'freactal'
import {
  findIndexById,
  overItemInListWithId,
  rejectById,
} from '../lib/ramda-ext'
import { createNewTaskWithDefaults, toggleTaskDone } from '../models/Task'
import { equals, head, times } from 'ramda'

export { injectState }

export const withAppState = provideState({
  initialState: () => ({
    tasks: times(createNewTaskWithDefaults)(8),
    selectedTaskIdx: 0,
  }),
  computed: {
    firstTask: tasks => head(tasks),
    selectedTaskId: ({ tasks, selectedTaskIdx, firstTask }) => {
      return tasks[selectedTaskIdx] || firstTask
    },
    isTaskSelected: ({ selectedTaskId }) => equals(selectedTaskId),
  },
  effects: {
    toggleTaskDone: (effects, id) =>
      overItemInListWithId(id)(toggleTaskDone)('tasks'),
    deleteTask: update((state, id) => ({
      tasks: rejectById(id)(state.tasks),
    })),
    selectTaskWithId: update((state, id) => ({
      selectedTaskIdx: findIndexById(id)(state.tasks),
    })),
  },
})
