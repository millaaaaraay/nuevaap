import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonModal, { static: false }) modal!: IonModal;

  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  message: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Maneja el inicio de sesión
  login() {
    this.emailError = '';
    this.passwordError = '';

    // Validar el correo electrónico
    if (!this.isValidEmail(this.email)) {
      this.emailError = 'Correo inválido';
    } 
    
    // Validar la contraseña con el patrón
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d{4,})(?=.*[a-zA-Z]{3,}).{8,}$/;
    if (!passwordPattern.test(this.password)) {
      this.passwordError = 'La contraseña debe contener al menos 4 números, 3 caracteres y 1 mayúscula.';
    } else if (this.email === 'benja@gmail.com' && this.password === 'Benj1234') {
      const navigationExtras: NavigationExtras = {
        state: {
          email: this.email
        }
      };
      this.router.navigate(['index'], navigationExtras);
    } else {
      this.router.navigate(['index']);
    }
  }

  // Función para validar el correo electrónico
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Función para manejar el cierre del modal
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  // Función para confirmar la recuperación de contraseña
  confirm() {
    if (this.isValidEmail(this.email)) {
      this.modal.dismiss(this.email, 'confirm');
    }
  }

  // Maneja el evento de cierre del modal
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `A reset link has been sent to ${ev.detail.data}!`;
    }
  }

  // Navega a la página de registro
  goToRegistro() {
    this.router.navigate(['/registro']);
  }
}
