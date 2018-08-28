const {
  injectBabelPlugin: injectBabelPluginUnCurried,
} = require('react-app-rewired')
const { curry, compose } = require('ramda')
const injectBabelPlugin = curry(injectBabelPluginUnCurried)
const webpack = require('webpack')

module.exports = {
  webpack: config => {
    const newConfig = compose(
      injectBabelPlugin('empower-assert'),
      injectBabelPlugin('espower'),
    )(config)
    newConfig.plugins.push(
      new webpack['ContextReplacementPlugin'](/power-assert-formatter/),
    )
    return newConfig
  },
}
