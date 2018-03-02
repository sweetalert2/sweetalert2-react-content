const { asyncIt } = require('./support/asyncIt')
const { cleanSwalState } = require('./support/cleanSwalState')
const { timeout } = require('./support/timeout')

const swal = require('sweetalert2')
const withReactContent = require('../lib/sweetalert2-react-content')

describe('sweetalert2-react-content', () => {
  asyncIt('returns a function with the same props as swal', async () => {
    const mySwal = withReactContent(swal)
    expect(Object.keys(mySwal)).toEqual(Object.keys(swal))
  })
  asyncIt('renders React elements for each supported option', async () => {
    await cleanSwalState()
    const mySwal = withReactContent(swal)
    await mySwal({
      animation: false,
      title: <span>title</span>,
      html: <span>html</span>,
      confirmButtonText: <span>confirmButtonText</span>,
      cancelButtonText: <span>cancelButtonText</span>,
      footer: <span>footer</span>,
      onOpen: () => {
        expect(swal.getTitle().innerHTML).toEqual('<span>title</span>')
        expect(swal.getContent().innerHTML).toEqual('<span>html</span>')
        expect(swal.getConfirmButton().innerHTML).toEqual(
          '<span>confirmButtonText</span>',
        )
        expect(swal.getCancelButton().innerHTML).toEqual(
          '<span>cancelButtonText</span>',
        )
        expect(swal.getFooter().innerHTML).toEqual('<span>footer</span>')
        mySwal.clickConfirm()
      },
    })
  })
  asyncIt('can mix React and non-React params', async () => {
    await cleanSwalState()
    const mySwal = withReactContent(swal)
    await mySwal({
      animation: false,
      title: <span>React element</span>,
      footer: 'plain text',
      onOpen: () => {
        expect(swal.getTitle().innerHTML).toEqual('<span>React element</span>')
        expect(swal.getFooter().innerHTML).toEqual('plain text')
        mySwal.clickConfirm()
      },
    })
  })
  asyncIt('works with shorthand swal calls', async () => {
    await cleanSwalState()
    const mySwal = withReactContent(swal)
    const swalPromise = mySwal(<span>React element</span>, 'plain text')
    await timeout(100) // TODO: Why is this needed?
    expect(swal.getTitle().innerHTML).toEqual('<span>React element</span>')
    expect(swal.getContent().innerHTML).toContain('plain text')
    mySwal.clickConfirm()
    await swalPromise
  })
})
