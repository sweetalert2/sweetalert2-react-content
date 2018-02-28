import swal from 'sweetalert2'
import withReactContent from '../lib/sweetalert2-react-content'
import { StatefulElement } from './StatefulElement'

main().catch(console.error)

async function main() {
  const mySwal = withReactContent(swal)

  await mySwal(<StatefulElement />)
}
