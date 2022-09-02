import { createRoot } from 'react-dom/client'

let root
let rootElement

export function renderReactApp(app) {
  if (root) {
    root.unmount()
    document.body.removeChild(rootElement)
  }
  rootElement = document.createElement('div')
  document.body.appendChild(rootElement)
  root = createRoot(rootElement)
  root.render(app)
}
