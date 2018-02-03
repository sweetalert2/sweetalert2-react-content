const React = require('react')
const ReactDOM = require('react-dom')
const {toParams} = require('./toParams')

const noop = () => {}

function sweetalert2ReactContent (swal) {
  return Object.assign((...args) => {
        // const params = {...toParams(args)} // clone so we can mutate // TODO: Uncomment
    const params = Object.assign({}, toParams(args)) // clone so we can mutate

    params.onOpen = params.onOpen || noop
    params.onClose = params.onClose || noop

    const mounts = [
            ['title', () => swal.getTitle()],
            ['html', () => swal.getContent()],
            ['confirmButtonText', () => swal.getConfirmButton()],
            ['cancelButtonText', () => swal.getCancelButton()],
            ['footer', () => global.document.querySelector('.swal2-container .swal2-footer')]
    ]

    for (const [paramKey, getter] of mounts) {
      if (React.isValidElement(params[paramKey])) {
        const reactElement = params[paramKey]
        params[paramKey] = ' '

        const childOnOpen = params.onOpen
        params.onOpen = () => {
          ReactDOM.render(reactElement, getter())
          childOnOpen()
        }

        const childOnClose = params.onClose
        params.onClose = () => {
          childOnClose()
          ReactDOM.unmountComponentAtNode(getter())
        }
      }
    }
    return swal(params)
  }, swal)
}

module.exports = sweetalert2ReactContent
