const path = require('path')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ProvidePlugin, NamedModulesPlugin } = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')

const appSrc = path.resolve('./lib')
const appPackageJson = path.resolve('./package.json')
const appNodeModules = path.resolve('./node_modules')

module.exports = {
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
  resolve: {
    modules: ['node_modules'], // .concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
    extensions: ['.js'],
    plugins: [
      new ModuleScopePlugin(appSrc, [appPackageJson]), // Prevents users from importing files from outside of src/ (or node_modules/).
    ],
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
    new ProvidePlugin({ React: 'react' }),
    new HtmlWebpackPlugin({ inject: true }), // Generates the `index.html` file
    new NamedModulesPlugin(), // Add module names to factory func
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(appNodeModules),
  ],
}
