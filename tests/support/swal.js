const swal = require('sweetalert2')

const initialSwalProps = Object.keys(swal)

async function cleanSwalState() {
  swal.resetDefaults()
  await swal({
    animation: false,
    title: 'clear',
    onOpen: () => swal.clickConfirm(),
  })
}

module.exports = {
  swal,
  initialSwalProps,
  cleanSwalState,
}
