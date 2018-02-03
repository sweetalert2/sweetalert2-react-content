const React = require('react')

function isAlreadyParams (args) {
  return typeof args[0] === 'object' && !React.isValidElement(args[0])
}

const argNames = ['title', 'html', 'type']
function argsToParams (args) {
  const params = {}
  argNames.forEach((name, index) => {
    if (args[index] !== undefined) {
      params[name] = args[index]
    }
  })
  return params
}

function toParams (args) {
  return isAlreadyParams(args) ? args[0] : argsToParams(args)
}

module.exports = {toParams}
