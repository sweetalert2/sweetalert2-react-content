/* eslint-disable no-use-before-define */
import { ReactElement } from 'react'
import swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2'

/**
 * Wraps SweetAlert2 implementation with a compatible implementation that supports React elements.
 * Example:
 *     import swal from 'sweetalert2';
 *
 *     const mySwal = withReactContent(swal)
 *     const mySwal = withReactContent()
 *
 * @param parentSwal SweetAlert2-compatible implementation if you want to pass your own wrapper.
 *                   By default, it will be the SweetAlert2 library itself.
 *
 * @returns A SweetAlert2-compatible interface with React capabilities added.
 */
export default function withReactContent(parentSwal?: SweetAlert2): SweetAlert2 & ReactSweetAlert

/**
 * Mimics SweetAlert2's call signatures, adding React elements as valid inputs.
 */
interface ReactSweetAlert {
  (title?: ReactElement | string, message?: ReactElement | string, icon?: SweetAlertIcon): Promise<SweetAlertResult>;

  (options: ReactSweetAlertOptions): Promise<SweetAlertResult>;

  fire(title?: ReactElement | string, message?: ReactElement | string, icon?: SweetAlertIcon): Promise<SweetAlertResult>;

  fire(options: ReactSweetAlertOptions): Promise<SweetAlertResult>;

  mixin(options: ReactSweetAlertOptions):SweetAlert2 & ReactSweetAlert;
}

type SweetAlert2 = typeof swal;

type ReactSweetAlertOptions = Overwrite<SweetAlertOptions, ReactOptions>;

type ReactElementOr<K extends keyof SweetAlertOptions> = SweetAlertOptions[K] | ReactElement<any>;

interface ReactOptions {
  title?: ReactElementOr<'title'>;
  html?: ReactElementOr<'html'>;
  confirmButtonText?: ReactElementOr<'confirmButtonText'>;
  denyButtonText?: ReactElementOr<'denyButtonText'>;
  cancelButtonText?: ReactElementOr<'cancelButtonText'>;
  footer?: ReactElementOr<'footer'>;
  closeButtonHtml?: ReactElementOr<'closeButtonHtml'>;
  iconHtml?: ReactElementOr<'iconHtml'>;
  loaderHtml?: ReactElementOr<'loaderHtml'>;
}

// Overwrite<T, U> will take the properties of U and add to it the properties of T that are not in U.
// This emulates an overwrite (override) of chosen properties of T with properties of U.
// It works like { ...T, ...U } in JS.
// https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-393936055
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
