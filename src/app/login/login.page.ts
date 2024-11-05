import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup; // Formulario para el inicio de sesión

  constructor(
    private router: Router, // Router para la navegación entre páginas
    private fbl: FormBuilder, // FormBuilder para crear formularios
    private authService: AuthService, // Servicio de autenticación para manejar el inicio de sesión
    private navCtrl: NavController // Controlador de navegación de Ionic
  ) {
    // Inicializar el formulario de inicio de sesión con validaciones
    this.formLogin = this.fbl.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$')]]
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus(); // Verificar si el usuario ya está autenticado al inicializar el componente
  }

  // Verificar si el usuario ya está autenticado
  async checkLoginStatus() {
    const isLoggedIn = this.authService.isAuthenticated(); // Verificar si hay una sesión activa
    if (isLoggedIn) {
      this.router.navigate(['/index']); // Redirigir al usuario a la página de inicio si ya está autenticado
    }
  }

  // Función para manejar el inicio de sesión
  async onLogin() {
    const userForm: string = this.formLogin.value.username; // Obtener el nombre de usuario del formulario
    const passForm: string = this.formLogin.value.password; // Obtener la contraseña del formulario
    if (this.formLogin.valid) { // Verificar si el formulario es válido
      console.log('Formulario válido, guardando...', this.formLogin.value); // Log de formulario válido
      try {
        await this.authService.login({ username: userForm, password: passForm }); // Intentar iniciar sesión con los datos ingresados
        console.log('Usuario autenticado:', this.authService.isAuthenticated()); // Log de usuario autenticado
        this.router.navigate(['/index']); // Navegar a la página de inicio
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        this.authService.presentToast("Credenciales incorrectas"); // Mostrar mensaje de error
      }
    } else {
      console.log('Formulario no válido, revisa los campos.'); // Log de formulario no válido
      this.formLogin.markAllAsTouched(); // Marcar todos los campos del formulario como tocados para mostrar errores
    }
  }

  // Redirigir a la página de registro
  navigateToRegisterPage() {
    this.router.navigate(['/registro']); // Redirige a la página de registro
  }
}
