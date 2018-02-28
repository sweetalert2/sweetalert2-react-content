const { asyncIt } = require('./support/asyncIt')
const { cleanSwalState, swal, initialSwalProps } = require('./support/swal')

describe('integration', () => {
  asyncIt('`swal` properties are consistent ', async () => {
    await cleanSwalState()

    expect(Object.keys(swal)).toEqual(initialSwalProps)
    await swal({
      title: 'test',
      onOpen: () => {
        expect(Object.keys(swal)).toEqual(initialSwalProps)
        swal.clickConfirm()
      },
    })
    expect(Object.keys(swal)).toEqual(initialSwalProps)
  })
})
