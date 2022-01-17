import Swal from 'sweetalert2/dist/sweetalert2' // js-only, no styles

const SwalWithoutAnimation = Swal.mixin({
  showClass: {
    popup: '',
    bakdrop: '',
  },
  hideClass: {
    popup: '',
  },
})

async function cleanSwalState() {
  await SwalWithoutAnimation.fire({
    title: 'clear',
    didOpen: () => Swal.clickConfirm(),
  })
}

function getVisibleSwalIconNames() {
  return ['success', 'error', 'warning', 'info', 'question'].filter((name) => {
    const iconElement = window.document.querySelector(`.swal2-icon.swal2-${name}`)
    return iconElement && iconElement.style.display !== 'none'
  })
}

export { Swal, SwalWithoutAnimation, cleanSwalState, getVisibleSwalIconNames }
