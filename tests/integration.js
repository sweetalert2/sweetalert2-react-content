const { asyncIt } = require('./support/asyncIt')
const { cleanSwalState, swal, initialSwalProps } = require('./support/swal')

describe('integration', () => {
  asyncIt('`swal` properties are consistent ', async () => {
    await cleanSwalState()
    const assertConsistent = () =>
      expect(Object.keys(swal)).toEqual(initialSwalProps)
    assertConsistent()
    await swal({
      title: 'test',
      onOpen: () => {
        assertConsistent()
        swal.clickConfirm()
      },
    })
    assertConsistent()
  })
})
