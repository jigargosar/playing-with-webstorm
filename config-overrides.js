const {
  injectBabelPlugin: injectBabelPluginUnCurried,
} = require('react-app-rewired')
const { curry, compose } = require('ramda')
const injectBabelPlugin = curry(injectBabelPluginUnCurried)
const webpack = require('webpack')

// function getWebpackMessagesPlugin() {
//   return new require('webpack-messages')({
//     name: 'client',
//     logger: str => console.log(`>> ${str}`),
//   })
// }

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
