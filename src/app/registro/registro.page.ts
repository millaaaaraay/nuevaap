import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  constructor(private router: Router) { }

  ngOnInit() {
    $(document).ready(() => {
      $('#registrationForm').on('submit', (event: any) => {
        event.preventDefault();
        let isValid = true;

        // Validaciones
        if ($('#name').val().trim() === '') {
          $('#name-error').text('El nombre es obligatorio.');
          isValid = false;
        } else {
          $('#name-error').text('');
        }

        if ($('#surname').val().trim() === '') {
          $('#surname-error').text('El apellido es obligatorio.');
          isValid = false;
        } else {
          $('#surname-error').text('');
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test($('#email').val().toString())) {
          $('#email-error').text('Correo electrónico no es válido.');
          isValid = false;
        } else {
          $('#email-error').text('');
        }

        const passwordPattern = /^(?=.*[A-Z])(?=.*\d{4,})(?=.*[a-zA-Z]{3,}).{8,}$/;
        if (!passwordPattern.test($('#password').val().toString())) {
          $('#password-error').text('La contraseña debe contener al menos 4 números, 3 caracteres y 1 mayúscula.');
          isValid = false;
        } else {
          $('#password-error').text('');
        }

        if (isValid) {
          const navigationExtras: NavigationExtras = {
            state: {
              name: $('#name').val(),
              surname: $('#surname').val(),
              email: $('#email').val(),
            }
          };
          this.router.navigate(['success-page'], navigationExtras);
        }
      });
    });
  }
}
