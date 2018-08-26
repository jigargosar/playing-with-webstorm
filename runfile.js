import { run } from 'runjs'

export function hello(name = 'Mysterious') {
  console.log(`Hello ${name}!`)
}

function addCommon() {
  run('yarn add ')
}
