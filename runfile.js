import { run } from 'runjs'

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

export const dev = () => {
  run(
    `nodemon -w package.json -w config-overrides.js -x react-app-rewired start`,
  )
}
