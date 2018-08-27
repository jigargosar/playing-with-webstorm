const {
  injectBabelPlugin: injectBabelPluginUnCurried,
} = require('react-app-rewired')
const { curry, compose } = require('ramda')
const injectBabelPlugin = curry(injectBabelPluginUnCurried)
const webpack = require('webpack')

module.exports = {
  webpack: config => {
    // const chain = new Chain()
    // chain.merge(config)
    // chain.merge(injectBabelPlugin('empower-assert')(chain.toConfig()))
    // chain.merge(injectBabelPlugin('espower')(chain.toConfig()))
    // const c1 = chain.toConfig();
    const c2 = compose(
      injectBabelPlugin('empower-assert'),
      injectBabelPlugin('espower'),
    )(config)
    c2.plugins.push(
      new webpack.ContextReplacementPlugin(/power-assert-formatter/),
    )
    // console.log(equals(c1, new Chain().merge(c2).toConfig()))
    return c2
  },
}
