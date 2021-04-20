/* eslint-env jest */
/* eslint-disable no-use-before-define */
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
  describe('rendering React elements for each supported option', () => {
    beforeEach(async () => cleanSwalState())
    it('works via .fire', async () => {
      const MySwal = withReactContent(SwalWithoutAnimation)
      await MySwal.fire({
        ...getReactOptions(),
        didOpen: () => {
          checkReactOptions(MySwal)
          MySwal.clickConfirm()
        },
      })
    })
    it('works via .mixin', async () => {
      const MySwal = withReactContent(SwalWithoutAnimation)
      const MyConfiguredSwal = MySwal.mixin({ ...getReactOptions() })
      await MyConfiguredSwal.fire({
        didOpen: () => {
          checkReactOptions(MySwal)
          MySwal.clickConfirm()
        },
      })
    })
    function getReactOptions () {
      return {
        title: <span>title</span>,
        html: <span>html</span>,
        iconHtml: <span>@</span>,
        confirmButtonText: <span>confirmButtonText</span>,
        denyButtonText: <span>denyButtonText</span>,
        cancelButtonText: <span>cancelButtonText</span>,
        closeButtonHtml: <span>closeButtonHtml</span>,
        footer: <span>footer</span>,
      }
    }
    function checkReactOptions (MySwal) {
      expect(MySwal.getTitle().innerHTML).toEqual('<span>title</span>')
      expect(MySwal.getHtmlContainer().innerHTML).toEqual('<span>html</span>')
      expect(MySwal.getConfirmButton().innerHTML).toEqual('<span>confirmButtonText</span>')
      expect(MySwal.getDenyButton().innerHTML).toEqual('<span>denyButtonText</span>')
      expect(MySwal.getCancelButton().innerHTML).toEqual('<span>cancelButtonText</span>')
      expect(MySwal.getIcon().innerHTML).toEqual('<div class="swal2-icon-content"><span>@</span></div>')
      expect(MySwal.getFooter().innerHTML).toEqual('<span>footer</span>')
      expect(MySwal.getCloseButton().innerHTML).toEqual('<span>closeButtonHtml</span>')
    }
  })
  it('can mix React and non-React params', async () => {
    await cleanSwalState()
    const MySwal = withReactContent(SwalWithoutAnimation)
    await MySwal.fire({
      title: <span>React element</span>,
      footer: 'plain text',
      didOpen: () => {
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
      didOpen: () => {
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
