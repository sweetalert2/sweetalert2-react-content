import swal from 'sweetalert2'
import withReactContent from '../../src/sweetalert2-react-content'
import { it } from '../util/asyncIt'
import {
  cleanSwalState,
  getSwalContentContent,
  getVisibleSwalIconNames,
} from '../util/swalUtil'
import { timeout } from '../util/util'

describe('integration', () => {
  it('renders React elements for each supported option', async () => {
    await cleanSwalState()
    const mySwal = withReactContent()
    await mySwal({
      animation: false,
      title: <span>title</span>,
      html: <span>html</span>,
      confirmButtonText: <span>confirmButtonText</span>,
      cancelButtonText: <span>cancelButtonText</span>,
      footer: <span>footer</span>,
      onOpen: () => {
        expect(mySwal.getTitle().innerHTML).toEqual('<span>title</span>')
        expect(mySwal.getContent().innerHTML).toEqual('<span>html</span>')
        expect(mySwal.getConfirmButton().innerHTML).toEqual(
          '<span>confirmButtonText</span>',
        )
        expect(mySwal.getCancelButton().innerHTML).toEqual(
          '<span>cancelButtonText</span>',
        )
        expect(mySwal.getFooter().innerHTML).toEqual('<span>footer</span>')
        mySwal.clickConfirm()
      },
    })
  })
  it('can mix React and non-React params', async () => {
    await cleanSwalState()
    const mySwal = withReactContent()
    await mySwal({
      animation: false,
      title: <span>React element</span>,
      footer: 'plain text',
      onOpen: () => {
        expect(mySwal.getTitle().innerHTML).toEqual(
          '<span>React element</span>',
        )
        expect(mySwal.getFooter().innerHTML).toEqual('plain text')
        mySwal.clickConfirm()
      },
    })
  })
  it('returns a function with the same props as swal', async () => {
    const mySwal = withReactContent()
    expect(Object.keys(mySwal)).toEqual(Object.keys(swal))
  })
  it('works with shorthand swal calls', async () => {
    await cleanSwalState()
    const mySwal = withReactContent()
    const swalPromise = mySwal(<span>title</span>, <span>html</span>, 'info')
    await timeout(100)
    expect(mySwal.getTitle().innerHTML).toEqual('<span>title</span>')
    expect(mySwal.getContent().innerHTML).toEqual('<span>html</span>')
    expect(getVisibleSwalIconNames()).toEqual(['info'])
    mySwal.clickConfirm()
    await swalPromise
  })
  it('has no effect on normal shorthand swal calls', async () => {
    await cleanSwalState()
    const mySwal = withReactContent()
    const swalPromise = mySwal('my title', 'my html', 'error')
    await timeout(100)
    expect(mySwal.getTitle().innerHTML).toEqual('my title')
    expect(getSwalContentContent().innerHTML).toEqual('my html')
    expect(getVisibleSwalIconNames()).toEqual(['error'])
    mySwal.clickConfirm()
    await swalPromise
  })
  it('can extend a given swal', async () => {
    const mockSwal = params => {
      expect(typeof params)
      expect(params.title).toEqual('foo')
      return { value: 'bar' }
    }
    Object.assign(mockSwal, swal, { method: () => {} })
    const mySwal = withReactContent(mockSwal)
    expect(mySwal.method).toEqual(mockSwal.method)
    const result = await mySwal({ title: 'foo' })
    expect(result).toEqual({ value: 'bar' })
  })
})
