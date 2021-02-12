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
    getter: swal => {
      const icon = swal.getIcon()
      if (icon) {
        const iconContent = document.createElement('div')
        iconContent.className = 'swal2-icon-content'
        icon.appendChild(iconContent)
        return iconContent
      }
      return null
    },
  },
]
