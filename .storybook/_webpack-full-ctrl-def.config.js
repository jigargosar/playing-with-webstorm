

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  // For example, add typescript loader:
  defaultConfig.module.rules.push(      {
    test: /\.stories\.jsx?$/,
    loaders: [
      {
        loader: require.resolve(
          '@storybook/addon-storysource/loader',
        ),
        options: {
          prettier: {
            trailingComma: 'all',
            arrowParens: 'avoid',
            singleQuote: true,
            semi: false,
            tabWidth: 2,
            printWidth: 70,
          },
          uglyCommentsRegex: [/^eslint-.*/, /^global.*/],
        },
      },
    ],
    enforce: 'pre',
  });

  return defaultConfig;
};
