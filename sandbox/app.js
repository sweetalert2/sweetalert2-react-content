import swal from 'sweetalert2'
import withReactContent from '../src/main'
import { StatefulElement } from './StatefulElement'

main().catch(console.error)

async function main() {
  const mySwal = withReactContent(swal)

  await mySwal(<StatefulElement />)
}
