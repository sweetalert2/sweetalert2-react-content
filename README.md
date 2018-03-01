# sweetalert2-react-content
Dynamic content in SweetAlert2, the React way

[![Build Status](https://travis-ci.org/zenflow/sweetalert2-react-content.svg?branch=master)](https://travis-ci.org/zenflow/sweetalert2-react-content)
[![Coverage Status](https://coveralls.io/repos/github/zenflow/sweetalert2-react-content/badge.svg?branch=master)](https://coveralls.io/github/zenflow/sweetalert2-react-content?branch=master)

`sweetalert2-react-content` is a sweetalert2 decorator adding support for React elements as content.

The following options can be React elements:

 - title
 - html
 - confirmButtonText
 - cancelButtonText
 - footer

## Example

```jsx
const swal = 'sweetalert2')
const withReactContent = 'sweetalert2-react-content'

const mySwal = withReactContent(swal)
// or const mySwal = withReactContent(swal, require('react-dom'))

mySwal({
  title: <p>Hello World</p>,
  footer: 'Copyright 2018',
  onOpen: () => {
    mySwal.clickConfirm() // `mySwal` comes with all of the methods of `swal`
  }
}).then(() => {
  return mySwal(<p>Shordhand works too</p>))
}
```
