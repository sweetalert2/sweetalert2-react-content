/* eslint-env node */

const webpack = require('webpack')

const reportCoverage = process.argv.includes('--report-coverage')

module.exports = config => {
  config.set({
    files: ['node_modules/babel-polyfill/dist/polyfill.min.js', 'tests/*.js'],
    browsers: ['Chrome'],
    reporters: ['spec', ...(reportCoverage ? ['coverage'] : [])],
    frameworks: ['jasmine'],
    preprocessors: {
      '{lib,tests}/**/*.js': ['webpack', 'sourcemap'],
    },
    webpack: {
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
      ],
    },
    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true,
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: './',
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-coverage',
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader',
    ],
  })
}
