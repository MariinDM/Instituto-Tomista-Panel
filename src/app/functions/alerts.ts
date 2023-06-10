import Swal from 'sweetalert2';

export function successDialog(msg: string) {
  return Swal.fire({
    position: 'center',
    icon: 'success',
    text: msg,
    showConfirmButton: false,
    timer: 1500,
  });
}
export function Paquetedialog(msg: string, time: any) {
  return Swal.fire({
    position: 'center',
    icon: 'warning',
    text: msg,
    showConfirmButton: false,
    timer: time,
  });
}
export function warningMessage(msg: string) {
  return Swal.fire({
    position: 'center',
    icon: 'warning',
    text: msg,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#65c005',
  });
}

export function errorMessage(msg: string) {
  return Swal.fire({
    position: 'center',
    icon: 'error',
    text: msg,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#ce2b16',
  });
}

export function confirmDialog(msg: string, cancel: string, confirm: string) {
  return Swal.fire({
    position: 'center',
    icon: 'warning',
    text: msg,
    showCancelButton: true,
    cancelButtonText: cancel,
    cancelButtonColor: '#ce2b16',
    showConfirmButton: true,
    confirmButtonText: confirm,
    confirmButtonColor: '#65c005',
  });
}




export function timeMessage(text: string) {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Registro completado',
    showConfirmButton: false,
    timer: 1500,
  });
}

export function timeMessage22(text: string, onClose: any) {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Registro completado',
    showConfirmButton: false,
    timer: 1500,
  });
}
export function timeMessage2(text: string, time) {
  Swal.fire({
    icon: 'success',
    title: text,
    showConfirmButton: false,
    timer: time,
  });

  //window.scrollTo(0, 3000);
}

export function timeMessagef(text: string, time) {
  Swal.fire({
    icon: 'success',
    title: text,
    showConfirmButton: false,
    timer: 1500,
  });

  //window.scrollTo(0, 3000);
}
export function timeMessage3(text: string, time) {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tu sesion ha sido cerrada',
    showConfirmButton: false,
    timer: 1500,
  });
}
