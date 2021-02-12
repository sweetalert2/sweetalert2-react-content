# sweetalert2-react-content

Official [SweetAlert2](https://sweetalert2.github.io/) enhancer adding support for React elements as content.

[![Build Status](https://github.com/sweetalert2/sweetalert2-react-content/workflows/build/badge.svg)](https://github.com/sweetalert2/sweetalert2-react-content/actions)
[![Coverage Status](https://coveralls.io/repos/github/sweetalert2/sweetalert2-react-content/badge.svg?branch=master)](https://coveralls.io/github/sweetalert2/sweetalert2-react-content?branch=master)
[![npm version](https://img.shields.io/npm/v/sweetalert2-react-content.svg)](https://www.npmjs.com/package/sweetalert2-react-content)

[![semantic-release badge](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/sweetalert2/sweetalert2-react-content/blob/master/CHANGELOG.md)
[![typescript .d.ts included](https://img.shields.io/badge/typescript-ready-brightgreen.svg)](https://github.com/sweetalert2/sweetalert2-react-content/blob/master/src/sweetalert2-react-content.d.ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The following options can be React elements:

 - title
 - html
 - confirmButtonText
 - denyButtonText
 - cancelButtonText
 - footer
 - closeButtonHtml
 - iconHtml

## Installation

```bash
npm install --save sweetalert2 sweetalert2-react-content
```

## Usage Example

```jsx
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

MySwal.fire({
  title: <p>Hello World</p>,
  footer: 'Copyright 2018',
  didOpen: () => {
    // `MySwal` is a subclass of `Swal`
    //   with all the same instance & static methods
    MySwal.clickConfirm()
  }
}).then(() => {
  return MySwal.fire(<p>Shorthand works too</p>)
})
```

The `dist/sweetalert2-react-content.umd.js` file defines `window.sweetalert2ReactContent` in non-CJS/AMD environments.
