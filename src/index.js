import React from 'react'
import ReactDOM from 'react-dom'
import { mounts } from './mounts'

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function
const error = message => new Error(`sweetalert2-react-content: ${message}`)

export default function withReactContent (ParentSwal) {
  return class extends ParentSwal {
    static argsToParams (args) {
      if (React.isValidElement(args[0]) || React.isValidElement(args[1])) {
        const params = {}
        ;['title', 'html', 'icon'].forEach((name, index) => {
          if (args[index] !== undefined) {
            params[name] = args[index]
          }
        })
        return params
      } else {
        return ParentSwal.argsToParams(args)
      }
    }

    _main (params) {
      params = Object.assign({}, params)

      params.onOpen = params.onOpen || noop
      params.onClose = params.onClose || noop

      mounts.forEach(({ key, getter }) => {
        if (React.isValidElement(params[key])) {
          const reactElement = params[key]
          params[key] = ' '

          let domElement

          const superOnOpen = params.onOpen
          params.onOpen = (element) => {
            domElement = getter(ParentSwal)
            ReactDOM.render(reactElement, domElement)
            superOnOpen(element)
          }

          const superOnClose = params.onClose
          params.onClose = (element) => {
            superOnClose(element)
            ReactDOM.unmountComponentAtNode(domElement)
          }
        }
      })

      return super._main(params)
    }

    update () {
      throw error(
        'Swal.update() is not yet supported. See https://github.com/sweetalert2/sweetalert2-react-content/issues/73',
      )
    }
  }
}
