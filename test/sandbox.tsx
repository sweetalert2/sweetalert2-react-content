import ReactDOM from 'react-dom/client'
import React, { useState } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.all'
import withReactContent from '../src/index'

function App() {
  const [inputValue, setInputValue] = useState('')

  function showSwal() {
    withReactContent(Swal).fire({
      title: <i>Input something</i>,
      input: 'text',
      inputValue,
      confirmButtonText: <i>Submit</i>,
      preConfirm: () => {
        setInputValue(Swal.getInput().value || '')
      },
    })
  }

  return (
    <>
      <button onClick={() => showSwal()}>show swal</button>
      <div>input value: {inputValue}</div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
