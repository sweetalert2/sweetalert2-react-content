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
    key: 'denyButtonText',
    getter: swal => swal.getDenyButton(),
  },
  {
    key: 'cancelButtonText',
    getter: swal => swal.getCancelButton(),
  },
  {
    key: 'footer',
    getter: swal => swal.getFooter(),
  },
  {
    key: 'closeButtonHtml',
    getter: swal => swal.getCloseButton(),
  },
  {
    key: 'iconHtml',
    getter: swal => swal.getIcon().querySelector('.swal2-icon-content'),
  },
]
