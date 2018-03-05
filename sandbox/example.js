import { swalWithReactContent } from './swalWithReactContent'
import { StatefulElement } from './StatefulElement'

export const example = async () => {
  await swalWithReactContent(<StatefulElement />)
}
