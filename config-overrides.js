const {
  injectBabelPlugin: injectBabelPluginUnCurried,
} = require('react-app-rewired')
const { curry, compose } = require('ramda')
const injectBabelPlugin = curry(injectBabelPluginUnCurried)
const webpack = require('webpack')
const WebpackMessages = require('webpack-messages')

export function getWebpackMessagesPlugin() {
  return new WebpackMessages({
    name: 'client',
    logger: str => console.log(`>> ${str}`),
  })
}

module.exports = {
  webpack: config => {
    const newConfig = compose(
      injectBabelPlugin('empower-assert'),
      injectBabelPlugin('espower'),
    )(config)
    newConfig.plugins.push(
      new webpack['ContextReplacementPlugin'](/power-assert-formatter/),
    )
    // newConfig.plugins.push(getWebpackMessagesPlugin())
    return newConfig
  },
}
