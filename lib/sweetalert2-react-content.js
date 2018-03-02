const { toParams } = require('./toParams')
const { mounts } = require('./mounts')

const noop = () => {}
const isValidReactElement = x =>
  typeof x === 'object' && x.$$typeof === Symbol.for('react.element')

function sweetalert2ReactContent(swal, ReactDOM = require('react-dom')) {
  const fn = (...args) => {
    const params = Object.assign({}, toParams(args)) // safe to mutate this

    params.onOpen = params.onOpen || noop
    params.onClose = params.onClose || noop

    for (const { key, getter } of mounts) {
      if (isValidReactElement(params[key])) {
        const reactElement = params[key]
        params[key] = ' '

        let domElement

        const childOnOpen = params.onOpen
        params.onOpen = () => {
          domElement = getter(swal)
          ReactDOM.render(reactElement, domElement)
          childOnOpen()
        }

        const childOnClose = params.onClose
        params.onClose = () => {
          childOnClose()
          ReactDOM.unmountComponentAtNode(domElement)
        }
      }
    }
    return swal(params)
  }
  return Object.assign(fn, swal)
}

module.exports = sweetalert2ReactContent
