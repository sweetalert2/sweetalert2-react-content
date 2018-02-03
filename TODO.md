# TODO

- publish build
- library
  - call `ReactDOM.unmountComponentAtNode` when parent node is destroyed (?) not in `onClose`
  - remove `require('react')`
  - remove `require('react-dom')` in favor of passing in via a closure
- Workflow
  - use webpack dev server
  - include (active) linting in `npm start` script (webpack dev server "overlay"?)
  - eslint + eslint-plugin-prettier
  - semantic-release
- Tests
  - add test coverage
  - add snapshot testing

(also search "TODO" in code)
