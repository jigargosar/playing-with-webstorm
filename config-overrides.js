const {
  injectBabelPlugin: injectBabelPluginUnCurried,
} = require('react-app-rewired')
const { curry, compose } = require('ramda')
const injectBabelPlugin = curry(injectBabelPluginUnCurried)
module.exports = {
  webpack: compose(
    injectBabelPlugin('empower-assert'),
    injectBabelPlugin('espower'),
  ),
}
