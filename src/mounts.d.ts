import swal from 'sweetalert2';

type SweetAlert2 = typeof swal;

export const mounts: Array<{ key: string; getter: (swal: SweetAlert2) => HTMLElement; }>;
