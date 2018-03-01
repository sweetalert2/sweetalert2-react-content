const { asyncIt } = require('./support/asyncIt')
const { cleanSwalState } = require('./support/cleanSwalState')

const swal = require('sweetalert2')
const withReactContent = require('../lib/sweetalert2-react-content')

describe('sweetalert2-react-content', () => {
  asyncIt('basic usage', async () => {
    await cleanSwalState()
    const mySwal = withReactContent(swal)
    expect(mySwal.isVisible()).toBe(false)
    await mySwal({
      animation: false,
      title: <span>react content</span>,
      onOpen: () => {
        expect(mySwal.isVisible()).toBe(true)
        expect(
          global.document.body.querySelector('.swal2-title').innerHTML,
        ).toEqual('<span>react content</span>')
        mySwal.clickConfirm()
      },
    })
    expect(mySwal.isVisible()).toBe(false)
  })
  asyncIt('returns a function with the same props as swal', async () => {
    const mySwal = withReactContent(swal)
    expect(Object.keys(mySwal)).toEqual(Object.keys(swal))
  })
})
