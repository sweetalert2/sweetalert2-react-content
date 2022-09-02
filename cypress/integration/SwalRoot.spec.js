/// <reference types="cypress" />

import React from 'react'
import Swal from 'sweetalert2'
import { delay } from '../helpers/delay'
import { renderReactApp } from '../helpers/renderReactApp'
import withReactContent, { SwalRoot } from '../../src/index'

context('SwalRoot', () => {
  it('works', async () => {
    const MySwal = withReactContent(Swal)

    // 'bad' is the default used when no context value has actually been provided
    const CountContext = React.createContext('bad')

    const MyApp = () => {
      const [count, setCount] = React.useState(1)
      const incrementCount = React.useCallback(() => setCount(count => count + 1), [])
      return (
        <CountContext.Provider value={count}>
          <div style={{textAlign: 'center'}}>
            <span>{count}</span>{' '}
            <button id="increment-count" onClick={incrementCount}>Increment</button>
          </div>
          <SwalRoot />
          <MyComponent />
        </CountContext.Provider>
      )
    }

    const MyComponent = () => {
      const showPopup = React.useCallback(() => {
        MySwal.fire({
          html: <MySwalContent />,
        })
      }, [])
      return (
        <div style={{textAlign: 'center'}}>
          <button id="show-popup" onClick={showPopup}>Show Popup</button>
        </div>
      )
    }

    const MySwalContent = () => {
      const count = React.useContext(CountContext)
      return <span>{count}</span>
    }

    renderReactApp(<MyApp />)
    await delay(100)
    document.querySelector('button#show-popup').click()
    await delay(100)
    expect(MySwal.getHtmlContainer().innerHTML).to.eq('<span>1</span>')
    document.querySelector('button#increment-count').click()
    await delay(100)
    expect(MySwal.getHtmlContainer().innerHTML).to.eq('<span>2</span>')
  })
})
