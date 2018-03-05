const swal = require('sweetalert2')

export const getSwalContentContent = () => {
  const content = swal.getContent()
  return content && content.querySelector('#swal2-content')
}
