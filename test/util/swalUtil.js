import Swal from 'sweetalert2/dist/sweetalert2' // js-only, no styles

async function cleanSwalState() {
  await Swal.fire({
    animation: false,
    title: 'clear',
    onOpen: () => Swal.clickConfirm(),
  })
}

function getSwalContentContent() {
  const content = Swal.getContent()
  return content && content.querySelector('#swal2-content')
}

function getVisibleSwalIconNames() {
  return ['success', 'error', 'warning', 'info', 'question'].filter(name => {
    const iconElement = window.document.querySelector(
      `.swal2-icon.swal2-${name}`,
    )
    return iconElement && iconElement.style.display !== 'none'
  })
}

export { Swal, cleanSwalState, getSwalContentContent, getVisibleSwalIconNames }
