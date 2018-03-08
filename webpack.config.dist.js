/* eslint-env node */
const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: [require.resolve('./src/sweetalert2-react-content')],
  output: {
    library: 'sweetalert2ReactContent',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'sweetalert2-react-content.umd.js',
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
  externals: expandExternalsConfig({
    react: 'React',
    'react-dom': 'ReactDOM',
    sweetalert2: 'swal',
  }),
}

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
