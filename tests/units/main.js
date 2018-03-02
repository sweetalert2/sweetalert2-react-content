const { asyncIt } = require('../support/asyncIt')
const { cleanSwalState } = require('../support/cleanSwalState')
const { timeout } = require('../support/timeout')

const swal = require('sweetalert2')
const withReactContent = require('../../src/main')

describe('sweetalert2-react-content', () => {
  asyncIt('renders React elements for each supported option', async () => {
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
  asyncIt('can mix React and non-React params', async () => {
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
  asyncIt('returns a function with the same props as swal', async () => {
    const mySwal = withReactContent()
    expect(Object.keys(mySwal)).toEqual(Object.keys(swal))
  })
  asyncIt('works with shorthand swal calls', async () => {
    await cleanSwalState()
    const mySwal = withReactContent()
    const swalPromise = mySwal(<span>React element</span>, 'plain text')
    await timeout(100)
    expect(mySwal.getTitle().innerHTML).toEqual('<span>React element</span>')
    expect(mySwal.getContent().innerHTML).toContain('plain text')
    mySwal.clickConfirm()
    await swalPromise
  })
  asyncIt('can extend a given swal', async () => {
    const mockSwal = params => {
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
