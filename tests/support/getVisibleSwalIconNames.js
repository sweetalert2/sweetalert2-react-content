function getVisibleSwalIconNames() {
  return ['success', 'error', 'warning', 'info', 'question'].filter(name => {
    const iconElement = window.document.querySelector(
      `.swal2-icon.swal2-${name}`,
    )
    return iconElement && iconElement.style.display !== 'none'
  })
}

module.exports = { getVisibleSwalIconNames }
