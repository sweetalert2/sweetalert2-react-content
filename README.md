# sweetalert2-react-content

Official [SweetAlert2](https://sweetalert2.github.io/) enhancer adding support for React elements as content.

[![Build Status](https://github.com/sweetalert2/sweetalert2-react-content/workflows/build/badge.svg)](https://github.com/sweetalert2/sweetalert2-react-content/actions)
[![Coverage Status](https://coveralls.io/repos/github/sweetalert2/sweetalert2-react-content/badge.svg?branch=main)](https://coveralls.io/github/sweetalert2/sweetalert2-react-content?branch=main)
[![npm version](https://img.shields.io/npm/v/sweetalert2-react-content.svg)](https://www.npmjs.com/package/sweetalert2-react-content)

[![semantic-release badge](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/sweetalert2/sweetalert2-react-content/blob/main/CHANGELOG.md)
[![typescript .d.ts included](https://img.shields.io/badge/typescript-ready-brightgreen.svg)](https://github.com/sweetalert2/sweetalert2-react-content/blob/main/src/sweetalert2-react-content.d.ts)
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
- loaderHtml

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
  didOpen: () => {
    // `MySwal` is a subclass of `Swal` with all the same instance & static methods
    MySwal.showLoading()
  },
}).then(() => {
  return MySwal.fire(<p>Shorthand works too</p>)
})
```

The `dist/sweetalert2-react-content.umd.js` file defines `window.sweetalert2ReactContent` in non-CJS/AMD environments.

## Limitations

Sweetalert2 popups are displayed outside the `ReactTree`.  This means that you can't easily instantiate `ReactRouter` components (such as `<Link>`) inside them.

If you need to do this, you have to provide a [HistoryRouter](https://reactrouter.com/docs/en/v6/routers/history-router) with shared `history`

```jsx
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "../path/to/history";

MySwal.fire({
  html: (
    <HistoryRouter history={history}>
      ...
    </HistoryRouter>
  ),
})
```