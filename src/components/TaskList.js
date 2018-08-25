import { BottomBarLayout } from './BottomBarLayout'
import { TaskActionBar } from './TaskActionBar'
import React from 'react'
import { getTitle, isDone } from '../models/Task'
import cn from 'classname'
import { HotKeys } from 'react-hotkeys'

function TaskItem({ task, queries, actions }) {
  const done = isDone(task)
  const selected = queries.isTaskSelected(task)
  const handlers = {
    toggleDone: actions.onTaskToggleDone(task),
  }
  return (
    <HotKeys handlers={handlers}>
      <div
        className={cn('fdr iic outline-0', 'bb b--black-10', {
          'bg-light-blue': selected,
        })}
        tabIndex={-1}
        onFocus={actions.onTaskFocus(task)}
        onBlur={actions.onTaskBlur(task)}
      >
        <div className="pa2">
          <input
            type="checkbox"
            checked={done}
            onChange={actions.onTaskDoneChange(task)}
          />
        </div>
        <div className="pa2 fa  ">{getTitle(task)}</div>
      </div>
    </HotKeys>
  )
}

export function TaskList({ queries, actions }) {
  return (
    <BottomBarLayout
      bottom={<TaskActionBar queries={queries} actions={actions} />}
    >
      {queries.tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          queries={queries}
          actions={actions}
        />
      ))}
    </BottomBarLayout>
  )
}
