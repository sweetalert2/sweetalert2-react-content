# sweetalert2-react-content

Official [SweetAlert2](https://sweetalert2.github.io/) enhancer adding support for React elements as content.

- Simple example: https://sweetalert2.github.io/recipe-gallery/sweetalert2-react.html
- With React Router: https://sweetalert2.github.io/recipe-gallery/sweetalert2-react-router.html
- With react-day-picker: https://sweetalert2.github.io/recipe-gallery/input-datepicker.html

---

The following options can be React elements:

- `title`
- `html`
- `confirmButtonText`
- `denyButtonText`
- `cancelButtonText`
- `footer`
- `closeButtonHtml`
- `iconHtml`
- `loaderHtml`

## Installation

```bash
npm install sweetalert2 sweetalert2-react-content
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
