const swal = require('sweetalert2')

export async function cleanSwalState() {
  swal.resetDefaults()
  await swal({
    animation: false,
    title: 'clear',
    onOpen: () => swal.clickConfirm(),
  })
}

export function getSwalContentContent() {
  const content = swal.getContent()
  return content && content.querySelector('#swal2-content')
}

export function getVisibleSwalIconNames() {
  return ['success', 'error', 'warning', 'info', 'question'].filter(name => {
    const iconElement = window.document.querySelector(
      `.swal2-icon.swal2-${name}`,
    )
    return iconElement && iconElement.style.display !== 'none'
  })
}
