/* eslint-env node */
const webpackTestsConfig = require('./webpack.config.tests')

module.exports = config => {
  config.set({
    files: [
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      'test/tests/**/*.js',
    ],
    browsers: ['Chrome'],
    reporters: [
      'spec',
      ...(process.argv.includes('--report-coverage') ? ['coverage'] : []),
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      '{src,test}/**/*.js': ['webpack', 'sourcemap'],
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
