import swal from 'sweetalert2'
import sweetalert2ReactContent from '../src/main'
import { swalWithReactContent } from './swalWithReactContent'

export const setGlobals = () => {
  Object.assign(global, {
    swal,
    sweetalert2ReactContent,
    swalWithReactContent,
  })
}
