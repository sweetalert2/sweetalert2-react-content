import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const getBanner = file => `\
/** @preserve
  * package: ${pkg.name} v${pkg.version}
  * file: ${file}
  * homepage: ${pkg.homepage}
  * license: ${pkg.license}
  **/\n`

export default [false, true].map(minify => {
  const plugins = [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ]
  if (minify) {
    plugins.push(
      terser({
        output: {
          comments: (_, { value }) => /@preserve/.test(value),
        },
      }),
    )
  }
  return {
    input: 'src/index.js',
    external: ['react', 'react-dom'],
    plugins,
    output: [
      {
        format: 'cjs',
      },
      {
        format: 'es',
      },
      {
        format: 'umd',
        name: 'sweetalert2ReactContent',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
    ].map(({ format, ...rest }) => {
      const fileExt = `${format + (minify ? '.min' : '')}.js`
      const file = `dist/sweetalert2-react-content.${fileExt}`
      return {
        format,
        file,
        sourcemap: true,
        banner: getBanner(file),
        ...rest,
      }
    }),
  }
})
