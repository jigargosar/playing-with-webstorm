module.exports = {
  module: {
    rules: [
      {
        test: /\.stories\.jsx?$/,
        loaders: [
          {
            loader: require.resolve('@storybook/addon-storysource/loader'),
            options: {
              prettierConfig: {
                trailingComma: 'all',
                arrowParens: 'avoid',
                singleQuote: true,
                semi: false,
              },
              uglyCommentsRegex: [
                /^eslint-.*/,
                /^global.*/,
              ]
            },
          },
        ],
        enforce: 'pre',
      },
    ],
  },
}
