export const mounts = [
  {
    key: 'title',
    getter: swal => swal.getTitle(),
  },
  {
    key: 'html',
    getter: swal => swal.getHtmlContainer(),
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
    getter: swal => swal.getFooter(),
  },
]
