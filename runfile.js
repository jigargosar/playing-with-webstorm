import { run } from 'runjs'
import { assert } from './src/lib/assert'

process.env['REACT_EDITOR'] = 'webstorm'

export function hello(name = 'Mysterious') {
  console.log(`Hello ${name}!`)
}

export function installCommonPackages() {
  run(
    'yarn add -D react-app-rewired power-assert babel-plugin-empower-assert babel-plugin-espower',
  )
}

export const i = installCommonPackages

export function rewired(cmdName, ...options) {
  assert(['start', 'build', 'test'].includes(cmdName))
  run(`react-app-rewired ${cmdName}`)
}

export const dev = () => {
  var cmdName = 'start'
  rewired(cmdName)
}
