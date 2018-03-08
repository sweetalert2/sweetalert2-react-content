/* eslint-env node */
const path = require('path')

module.exports = [
  getWebpackConfig({ minify: true }),
  getWebpackConfig({ minify: false }),
]

function getWebpackConfig({ minify }) {
  return {
    mode: minify ? 'production' : 'development',
    devtool: 'source-map',
    entry: [require.resolve('./src/sweetalert2-react-content')],
    output: {
      library: 'sweetalert2ReactContent',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
      filename: `sweetalert2-react-content.${minify ? 'umd.min' : 'umd'}.js`,
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
