const {
  injectBabelPlugin: injectBabelPluginUnCurried,
} = require('react-app-rewired')
const { curry, compose } = require('ramda')
const injectBabelPlugin = curry(injectBabelPluginUnCurried)
const Config = require('webpack-chain')
module.exports = {
  webpack: (config, env) =>
    compose(
      injectBabelPlugin('empower-assert'),
      injectBabelPlugin('espower'),
    ),
}
