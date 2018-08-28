import { run } from 'runjs'
import { assert } from './src/lib/assert'

process.env['REACT_EDITOR'] = 'webstorm'

export function hello(name = 'Mysterious') {
  console.log(`Hello ${name}!`)
}

export function installCommonPackages() {
  run(
    `yarn add -D \\
    webpack-chain \\
    react-app-rewired \\
    power-assert babel-plugin-empower-assert babel-plugin-espower \\`,
  )
}

export const i = installCommonPackages

export function rewired(cmdName, ...options) {
  assert(['start', 'build', 'test'].includes(cmdName))
  const command = `react-app-rewired ${cmdName} `
  run(command)
}

export const dev = () => {
  const cmdName = 'start'
  rewired(cmdName)
}
