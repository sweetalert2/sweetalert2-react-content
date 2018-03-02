const getSwalFooter = () =>
  global.document.querySelector('.swal2-container .swal2-footer')

const mounts = [
  {
    key: 'title',
    getter: swal => swal.getTitle(),
  },
  {
    key: 'html',
    getter: swal => swal.getContent(),
  },
  {
    key: 'confirmButtonText',
    getter: swal => swal.getConfirmButton(),
  },
  {
    key: 'cancelButtonText',
    getter: swal => swal.getCancelButton(),
  },
  {
    key: 'footer',
    getter: swal => getSwalFooter(),
  },
]

module.exports = { mounts }
