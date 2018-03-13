import swal from 'sweetalert2'
import sweetalert2ReactContent from '../src/index'
import { swalWithReactContent } from './swalWithReactContent'
import { example } from './example'

Object.assign(global, {
  swal,
  sweetalert2ReactContent,
  swalWithReactContent,
})

example().catch(console.error)
