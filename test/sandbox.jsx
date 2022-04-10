import React from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.all'
import withReactContent from '../src/index'

let MySwal = withReactContent(Swal)

MySwal.fire({
  icon: 'success',
  title: <i>Test</i>,
  html: <i>Hello World</i>,
})
