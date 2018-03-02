/* eslint-env node */
const webpackTestsConfig = require('./webpack.config.tests')
const { reportCoverage } = require('./tests/support/cliFlags')

module.exports = config => {
  config.set({
    files: [
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      'tests/units/**/*.js',
    ],
    browsers: ['Chrome'],
    reporters: ['spec', ...(reportCoverage ? ['coverage'] : [])],
    frameworks: ['jasmine'],
    preprocessors: {
      '{src,tests}/**/*.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackTestsConfig,
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
