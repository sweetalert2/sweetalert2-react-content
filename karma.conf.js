const webpack = require('webpack')

module.exports = config => {
  config.set({
    files: [
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      'tests/*.js'
    ],
    browsers: [
      'Chrome'
    ],
    reporters: ['spec'],
    frameworks: ['jasmine'],
    preprocessors: {
      '{lib,tests}/**/*.js': ['webpack', 'sourcemap']
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
              options: {/* babel options */}
            }
          }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          'React': 'react'
        })
      ]
    },
    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader'
    ]
  })
}
