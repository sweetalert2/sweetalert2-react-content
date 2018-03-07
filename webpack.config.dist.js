/* eslint-env node */
const path = require('path')

function expandExternalsConfig(compactConfig) {
  const expandedConfig = {}
  for (const packageName of Object.keys(compactConfig)) {
    expandedConfig[packageName] = {
      commonjs: packageName,
      commonjs2: packageName,
      amd: packageName,
      root: compactConfig[packageName],
    }
  }
  return expandedConfig
}

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: [require.resolve('./src/main')],
  externals: expandExternalsConfig({
    react: 'React',
    'react-dom': 'ReactDOM',
    sweetalert2: 'swal',
  }),
  output: {
    library: 'sweetalert2ReactContent',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
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
}
