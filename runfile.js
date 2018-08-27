import { run } from 'runjs'

export function hello(name = 'Mysterious') {
  console.log(`Hello ${name}!`)
}

export function installCommonPackages() {
  run(
    'yarn add -D react-app-rewired power-assert babel-plugin-empower-assert babel-plugin-espower',
  )
}
