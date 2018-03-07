const swal = require('sweetalert2')

function getSwalContentContent() {
  const content = swal.getContent()
  return content && content.querySelector('#swal2-content')
}

module.exports = { getSwalContentContent }
