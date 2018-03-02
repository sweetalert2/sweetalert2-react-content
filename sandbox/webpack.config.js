const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: ['babel-polyfill', require.resolve('./app')],
  output: {
    pathinfo: true, // Add /* filename */ comments to generated require()s in the output.
    filename: 'bundle.js', // This does not produce a real file. It's just a virtual path.
    publicPath: '/', // This is the URL that app is served from.
    devtoolModuleFilenameTemplate(info) {
      // Point sourcemap entries to original disk location (format as URL on Windows)
      return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {},
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.NamedModulesPlugin(), // Add module names to factory func
    new HtmlWebpackPlugin({ inject: true }), // Generates the `index.html` file
  ],
}
