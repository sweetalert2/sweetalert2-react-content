import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import pkg from './package.json'

const version = process.env.VERSION || pkg.version

const banner = `// ${pkg.name} v${version}\n`

export default [false, true].map((minify) => {
  const plugins = [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'preventAssignment': true,
    }),
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
  ]
  if (minify) {
    plugins.push(
      terser({
        output: {
          comments: (_, { value }) => /sweetalert2-react-content v/.test(value),
        },
      })
    )
  }
  return {
    input: 'src/index.js',
    external: ['react', 'react-dom/client'],
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
          'react-dom/client': 'ReactDOM',
        },
      },
    ].map(({ format, ...rest }) => {
      const fileExt = `${format + (minify ? '.min' : '')}.js`
      const file = `dist/sweetalert2-react-content.${fileExt}`
      return {
        format,
        file,
        sourcemap: true,
        banner,
        exports: 'auto',
        ...rest,
      }
    }),
  }
})
