/* eslint-env jest */

import React from 'react'
import withReactContent from '../src/index'
import {
  Swal,
  SwalWithoutAnimation,
  cleanSwalState,
  getVisibleSwalIconNames,
} from './util/swalUtil'
import { timeout } from './util/util'

describe('integration', () => {
  beforeAll(async () => {
    // jest doesn't implement `window.scrollTo` so we need to mock it
    window.scrollTo = () => {} // eslint-disable-line @typescript-eslint/no-empty-function
  })
  it('renders React elements for each supported option', async () => {
    await cleanSwalState()
    const MySwal = withReactContent(SwalWithoutAnimation)
    await MySwal.fire({
      title: <span>title</span>,
      html: <span>html</span>,
      confirmButtonText: <span>confirmButtonText</span>,
      cancelButtonText: <span>cancelButtonText</span>,
      footer: <span>footer</span>,
      onOpen: () => {
        expect(MySwal.getTitle().innerHTML).toEqual('<span>title</span>')
        expect(MySwal.getHtmlContainer().innerHTML).toEqual('<span>html</span>')
        expect(MySwal.getConfirmButton().innerHTML).toEqual(
          '<span>confirmButtonText</span>',
        )
        expect(MySwal.getCancelButton().innerHTML).toEqual(
          '<span>cancelButtonText</span>',
        )
        expect(MySwal.getFooter().innerHTML).toEqual('<span>footer</span>')
        MySwal.clickConfirm()
      },
    })
  })
  it('can mix React and non-React params', async () => {
    await cleanSwalState()
    const MySwal = withReactContent(SwalWithoutAnimation)
    await MySwal.fire({
      title: <span>React element</span>,
      footer: 'plain text',
      onOpen: () => {
        expect(MySwal.getTitle().innerHTML).toEqual(
          '<span>React element</span>',
        )
        expect(MySwal.getFooter().innerHTML).toEqual('plain text')
        MySwal.clickConfirm()
      },
    })
  })
  it('can fire twice without crashing', async () => {
    await cleanSwalState()
    const MySwal = withReactContent(SwalWithoutAnimation)
    MySwal.fire({
      title: <span>React element</span>,
      footer: 'plain text'
    })
    await MySwal.fire({
      title: <span>React element</span>,
      footer: 'plain text',
      onOpen: () => {
        expect(MySwal.getTitle().innerHTML).toEqual(
          '<span>React element</span>',
        )
        expect(MySwal.getFooter().innerHTML).toEqual('plain text')
        MySwal.clickConfirm()
      },
    })
  })
  it('returns a class with the same instance & static properties as Swal', async () => {
    const MySwal = withReactContent(Swal)
    Object.keys(Swal).forEach(key => {
      expect(typeof MySwal[key]).toEqual(typeof Swal[key])
    })
    Object.keys(Swal.prototype).forEach(key => {
      expect(typeof MySwal.prototype[key]).toEqual(typeof Swal.prototype[key])
    })
  })
  it('works with shorthand Swal calls', async () => {
    await cleanSwalState()
    const MySwal = withReactContent(Swal)
    const swal = MySwal.fire(<span>title</span>, <span>html</span>, 'info')
    await timeout(100)
    expect(MySwal.getTitle().innerHTML).toEqual('<span>title</span>')
    expect(MySwal.getHtmlContainer().innerHTML).toEqual('<span>html</span>')
    expect(getVisibleSwalIconNames()).toEqual(['info'])
    MySwal.clickConfirm()
    await swal
  })
  it('has no effect on normal shorthand Swal calls', async () => {
    await cleanSwalState()
    const MySwal = withReactContent(Swal)
    const swal = MySwal.fire('my title', 'my html', 'error')
    await timeout(100)
    expect(MySwal.getTitle().innerHTML).toEqual('my title')
    expect(MySwal.getHtmlContainer().innerHTML).toEqual('my html')
    expect(getVisibleSwalIconNames()).toEqual(['error'])
    MySwal.clickConfirm()
    await swal
  })
})
