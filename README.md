# sweetalert2-react-content
sweetalert2 decorator adding support for React elements as content

[![Build Status](https://travis-ci.org/zenflow/sweetalert2-react-content.svg?branch=master)](https://travis-ci.org/zenflow/sweetalert2-react-content)
[![Coverage Status](https://coveralls.io/repos/github/zenflow/sweetalert2-react-content/badge.svg?branch=master)](https://coveralls.io/github/zenflow/sweetalert2-react-content?branch=master)

## Motivation

Dynamic content in SweetAlert2, the React way

## Example

```jsx
import swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(swal)

mySwal({
  title: <p>Hello World</p>,
  footer: 'Copyright 2018',
}).then(() => mySwal(<p>Shordhand works too</p>))
```
