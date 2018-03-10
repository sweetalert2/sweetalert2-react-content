import swal from 'sweetalert2';

export const mounts: Array<{ key: string; getter: (swal: swal) => HTMLElement; }>;
