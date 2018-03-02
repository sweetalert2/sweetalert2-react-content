/* eslint-env node */
const webpack = require('webpack')
const { reportCoverage } = require('./tests/support/cliFlags')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: reportCoverage
              ? [['istanbul', { include: ['lib/**/*.js'] }]]
              : [],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.NamedModulesPlugin(),
  ],
}
