export function xToggleProp(p, task) {
  task[p] = !task[p]
}

export function xRemoveAt(idx, list) {
  list.splice(idx, 1)
}
