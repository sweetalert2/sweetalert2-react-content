/// <reference types="cypress" />

import React from 'react'
import Swal from 'sweetalert2'
import withReactContentCjs from '../../dist/sweetalert2-react-content.cjs'
import withReactContentEs from '../../dist/sweetalert2-react-content.es'
import withReactContentUmd from '../../dist/sweetalert2-react-content.umd'

const entries = {
  distCjs: withReactContentCjs,
  distEs: withReactContentEs,
  distUmd: withReactContentUmd,
}

for (const [name, withReactContent] of Object.entries(entries)) {
  context(`SweetAlert2 React Content: ${name}`, () => {
    describe('rendering React elements for each supported option', () => {
      it('works via .fire', (done) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
          ...reactParams,
          didOpen: () => {
            setTimeout(() => {
              checkReactOptions(MySwal)
              done()
            }, 100)
          },
        })
      })

      it('works via .mixin', (done) => {
        const MySwal = withReactContent(Swal)
        const MyConfiguredSwal = MySwal.mixin({ ...reactParams })
        MyConfiguredSwal.fire({
          didOpen: () => {
            setTimeout(() => {
              checkReactOptions(MySwal)
              done()
            }, 100)
          },
        })
      })

      const reactParams = {
        title: React.createElement('span', {}, 'title'),
        html: React.createElement('span', {}, 'html'),
        iconHtml: React.createElement('span', {}, '@'),
        loaderHtml: React.createElement('span', {}, '%'),
        confirmButtonText: React.createElement('span', {}, 'confirmButtonText'),
        denyButtonText: React.createElement('span', {}, 'denyButtonText'),
        cancelButtonText: React.createElement('span', {}, 'cancelButtonText'),
        closeButtonHtml: React.createElement('span', {}, 'closeButtonHtml'),
        footer: React.createElement('span', {}, 'footer'),
      }

      const checkReactOptions = (MySwal) => {
        expect(MySwal.getTitle().innerHTML).to.eq('<span>title</span>')
        expect(MySwal.getHtmlContainer().innerHTML).to.eq('<span>html</span>')
        expect(MySwal.getConfirmButton().innerHTML).to.eq('<span>confirmButtonText</span>')
        expect(MySwal.getDenyButton().innerHTML).to.eq('<span>denyButtonText</span>')
        expect(MySwal.getCancelButton().innerHTML).to.eq('<span>cancelButtonText</span>')
        expect(MySwal.getIcon().innerHTML).to.eq('<div class="swal2-icon-content"><span>@</span></div>')
        expect(MySwal.getFooter().innerHTML).to.eq('<span>footer</span>')
        expect(MySwal.getCloseButton().innerHTML).to.eq('<span>closeButtonHtml</span>')
        expect(MySwal.getLoader().innerHTML).to.eq('<span>%</span>')
      }
    })

    it('can mix React and non-React params', (done) => {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <span>React element</span>,
        footer: 'plain text',
        didOpen: () => {
          expect(MySwal.getTitle().innerHTML).to.eq('<span>React element</span>')
          expect(MySwal.getFooter().innerHTML).to.eq('plain text')
          done()
        },
      })
    })

    it('can fire twice without crashing', (done) => {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <span>React element</span>,
        footer: 'plain text',
      })
      MySwal.fire({
        title: <span>React element</span>,
        footer: 'plain text',
        didOpen: () => {
          expect(MySwal.getTitle().innerHTML).to.eq('<span>React element</span>')
          expect(MySwal.getFooter().innerHTML).to.eq('plain text')
          done()
        },
      })
    })

    it('returns a class with the same instance & static properties as Swal', async () => {
      const MySwal = withReactContent(Swal)
      Object.keys(Swal).forEach((key) => {
        expect(typeof MySwal[key]).to.eq(typeof Swal[key])
      })
      Object.keys(Swal.prototype).forEach((key) => {
        expect(typeof MySwal.prototype[key]).to.eq(typeof Swal.prototype[key])
      })
    })

    it('works with shorthand Swal calls', (done) => {
      const MySwal = withReactContent(Swal)
      const swal = MySwal.fire(<span>title</span>, <span>html</span>, 'info')
      cy.wait(100).then(async () => {
        expect(MySwal.getTitle().innerHTML).to.eq('<span>title</span>')
        expect(MySwal.getHtmlContainer().innerHTML).to.eq('<span>html</span>')
        expect(MySwal.getIcon().classList.contains('swal2-info')).to.be.true
        MySwal.clickConfirm()
        await swal
        done()
      })
    })

    it('has no effect on normal shorthand Swal calls', (done) => {
      const MySwal = withReactContent(Swal)
      const swal = MySwal.fire('my title', 'my html', 'error')
      cy.wait(100).then(async () => {
        expect(MySwal.getTitle().innerHTML).to.eq('my title')
        expect(MySwal.getHtmlContainer().innerHTML).to.eq('my html')
        expect(MySwal.getIcon().classList.contains('swal2-error')).to.be.true
        MySwal.clickConfirm()
        await swal
        done()
      })
    })

    it('can update params via .update()', (done) => {
      const MySwal = withReactContent(Swal)
      const swal = MySwal.fire(<span>title</span>, <span>html</span>, 'error')
      cy.wait(100).then(() => {
        MySwal.update({
          title: <span>new title</span>,
          html: <span>new html</span>,
          icon: 'success',
        })
        // read more about why this setTimeout is needed here:
        // https://github.com/reactwg/react-18/discussions/5 (What about the render callback?)
        setTimeout(async () => {
          expect(MySwal.getTitle().innerHTML).to.eq('<span>new title</span>')
          expect(MySwal.getHtmlContainer().innerHTML).to.eq('<span>new html</span>')
          expect(MySwal.getIcon().classList.contains('swal2-success')).to.be.true
          MySwal.clickConfirm()
          await swal
          done()
        }, 100)
      })
    })
  })
}
