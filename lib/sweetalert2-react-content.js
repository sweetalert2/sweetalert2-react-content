const { toParams } = require('./toParams')

const noop = () => {}
const getSwalFooter = () =>
  global.document.querySelector('.swal2-container .swal2-footer')
const isValidReactElement = x =>
  typeof x === 'object' && x.$$typeof === Symbol.for('react.element')

const mounts = [
  {
    key: 'title',
    getter: swal => swal.getTitle(),
  },
  {
    key: 'html',
    getter: swal => swal.getContent(),
  },
  {
    key: 'confirmButtonText',
    getter: swal => swal.getConfirmButton(),
  },
  {
    key: 'cancelButtonText',
    getter: swal => swal.getCancelButton(),
  },
  {
    key: 'footer',
    getter: swal => getSwalFooter(),
  },
]

function sweetalert2ReactContent(swal, ReactDOM = require('react-dom')) {
  return Object.assign((...args) => {
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
  }, swal)
}

module.exports = sweetalert2ReactContent
