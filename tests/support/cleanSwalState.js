const swal = require('sweetalert2')

async function cleanSwalState() {
  swal.resetDefaults()
  await swal({
    animation: false,
    title: 'clear',
    onOpen: () => swal.clickConfirm(),
  })
}

module.exports = { cleanSwalState }
