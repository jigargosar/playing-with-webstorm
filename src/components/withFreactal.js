import { injectState, provideState, update } from 'freactal'
import {
  findIndexById,
  overItemInListWithId,
  rejectById,
} from '../lib/ramda-ext'
import { createNewTaskWithDefaults, toggleTaskDone } from '../models/Task'
import { compose, equals, path, prop, times } from 'ramda'

export { injectState }

function getSelectedTaskId(state) {
  const { selectedTaskIdx, tasks } = state
  const id = prop('id')(tasks[selectedTaskIdx] || tasks[0])
  return id
}

export const withAppState = provideState({
  initialState: () => ({
    tasks: times(createNewTaskWithDefaults)(8),
    selectedTaskIdx: 0,
  }),
  computed: {
    firstTask: path(['tasks', 0]),
    selectedTask: ({ tasks, selectedTaskIdx, firstTask }) => {
      return (tasks || [])[selectedTaskIdx] || firstTask
    },
    selectedTaskId: path(['selectedTask', 'id']),
    isTaskSelected: compose(
      equals,
      prop('selectedTaskId'),
    ),
  },
  effects: {
    // toggleTaskDone: (effects, id) =>
    //   overItemInListWithId(id)(toggleTaskDone)('tasks'),
    // deleteTask: update((state, id) => ({
    //   tasks: rejectById(id)(state.tasks),
    // })),

    toggleSelectedTaskDone: update(state => {
      const id = getSelectedTaskId(state)
      return overItemInListWithId(id)(toggleTaskDone)('tasks')(state)
    }),
    deleteSelectedTask: update(state => ({
      tasks: rejectById(getSelectedTaskId(state))(state.tasks),
    })),
    selectTaskWithId: update((state, id) => ({
      selectedTaskIdx: findIndexById(id)(state.tasks),
    })),
  },
})
