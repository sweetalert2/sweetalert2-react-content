const React = require('react')
const ReactDOM = require('react-dom')
const { mounts } = require('./mounts')

const noop = () => {}

function sweetalert2ReactContent(arg) {
  const options =
    typeof arg === 'function'
      ? { swal: arg }
      : typeof arg === 'object' ? arg : {}
  const parentSwal = options.swal || require('sweetalert2')

  const argsToParams = args => {
    if (React.isValidElement(args[0]) || React.isValidElement(args[1])) {
      const params = {}
      ;['title', 'html', 'type'].forEach((name, index) => {
        if (args[index] !== undefined) {
          params[name] = args[index]
        }
      })
      return params
    } else {
      return parentSwal.argsToParams(args)
    }
  }

  const fn = (...args) => {
    const params = Object.assign({}, argsToParams(args)) // safe to mutate this

    params.onOpen = params.onOpen || noop
    params.onClose = params.onClose || noop

    for (const { key, getter } of mounts) {
      if (React.isValidElement(params[key])) {
        const reactElement = params[key]
        params[key] = ' '

        let domElement

        const childOnOpen = params.onOpen
        params.onOpen = () => {
          domElement = getter(parentSwal)
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
    return parentSwal(params)
  }

  return Object.assign(fn, parentSwal, { argsToParams })
}

module.exports = sweetalert2ReactContent
