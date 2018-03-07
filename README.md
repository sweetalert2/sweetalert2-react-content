# sweetalert2-react-content

[![Build Status](https://travis-ci.org/sweetalert2/sweetalert2-react-content.svg?branch=master)](https://travis-ci.org/sweetalert2/sweetalert2-react-content)
[![Coverage Status](https://coveralls.io/repos/github/sweetalert2/sweetalert2-react-content/badge.svg?branch=master)](https://coveralls.io/github/sweetalert2/sweetalert2-react-content?branch=master)
[![npm version](https://badge.fury.io/js/sweetalert2-react-content.svg)](https://www.npmjs.com/packages/sweetalert2-react-content)
[![Greenkeeper badge](https://badges.greenkeeper.io/sweetalert2/sweetalert2-react-content.svg)](https://greenkeeper.io/)
![semantic-release badge](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Dynamic content in SweetAlert2, the React way

`sweetalert2-react-content` is a sweetalert2 decorator adding support for React elements as content.

The following options can be React elements:

 - title
 - html
 - confirmButtonText
 - cancelButtonText
 - footer

## Example

```jsx
const swal = require('sweetalert2')
const withReactContent = require('sweetalert2-react-content')

const mySwal = withReactContent(swal)
// or just `const mySwal = withReactContent()`

mySwal({
  title: <p>Hello World</p>,
  footer: 'Copyright 2018',
  onOpen: () => {
    mySwal.clickConfirm() // `mySwal` comes with all of the methods of `swal`
  }
}).then(() => {
  return mySwal(<p>Shordhand works too</p>)
})
```

The main export is a [UMD module](https://github.com/umdjs/umd) (CommonJS & ESM compatible), and defines `window.sweetalert2ReactContent` in non-CJS/ESM environments.
