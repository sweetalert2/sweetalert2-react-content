import React from 'react'
import { createRoot } from 'react-dom/client'
import { mounts } from './mounts'

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

export default function withReactContent(ParentSwal) {
  /* Returns `params` separated into a tuple of `reactParams` (the React params that need to be rendered)
  and`otherParams` (all the other parameters, with any React params replaced with a space ' ') */
  function extractReactParams(params) {
    const reactParams = {}
    const otherParams = {}
    const mountKeys = mounts.map((mount) => mount.key)
    Object.entries(params).forEach(([key, value]) => {
      if (mountKeys.includes(key) && React.isValidElement(value)) {
        reactParams[key] = value
        otherParams[key] = ' '
      } else {
        otherParams[key] = value
      }
    })
    return [reactParams, otherParams]
  }

  function render(swal, reactParams) {
    Object.entries(reactParams).forEach(([key, value]) => {
      const mount = mounts.find((mount) => mount.key === key)
      const domElement = mount.getter(ParentSwal)
      const root = createRoot(domElement)
      root.render(value)
      swal.__roots.push(root)
    })
  }

  function unrender(swal) {
    swal.__roots.forEach((root) => {
      root.unmount()
    })
    swal.__roots = []
  }

  return class extends ParentSwal {
    static argsToParams(args) {
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

    _main(params, mixinParams) {
      this.__roots = []
      this.__params = Object.assign({}, mixinParams, params)
      const [reactParams, otherParams] = extractReactParams(this.__params)
      const superWillOpen = otherParams.willOpen || noop
      const superDidOpen = otherParams.didOpen || noop
      const superDidDestroy = otherParams.didDestroy || noop
      return super._main(
        Object.assign({}, otherParams, {
          willOpen: (popup) => {
            render(this, reactParams)
            superWillOpen(popup)
          },
          didOpen: (popup) => {
            // read more about why this setTimeout is needed here:
            // https://github.com/reactwg/react-18/discussions/5 (What about the render callback?)
            setTimeout(() => {
              superDidOpen(popup)
            })
          },
          didDestroy: (popup) => {
            superDidDestroy(popup)
            unrender(this)
          },
        })
      )
    }

    update(params) {
      Object.assign(this.__params, params)
      unrender(this)
      const [reactParams, otherParams] = extractReactParams(this.__params)
      super.update(otherParams)
      render(this, reactParams)
    }
  }
}
