import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  successNotification(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      timer: 3000, // Auto close after 3 seconds
      showConfirmButton: false // Hide the "OK" button
    });
  }

  failNotification(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      timer: 3000, // Auto close after 3 seconds
      showConfirmButton: false // Hide the "OK" button
    });
  }

  infoNotification(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      timer: 3000, // Auto close after 3 seconds
      showConfirmButton: false // Hide the "OK" button
    });
  }
}