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
      username: ['', [Validators.required, Validators.email]], // Validar que sea un correo
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$')]] // Validar contraseña
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus(); // Verificar si el usuario ya está autenticado al inicializar el componente
  }

  async checkLoginStatus() {
    const isLoggedIn = this.authService.isAuthenticated(); // Verificar si hay una sesión activa
    if (isLoggedIn) {
      this.router.navigate(['/home']); // Redirigir al usuario a la página de inicio si ya está autenticado
    }
  }

  async onLogin() {
    const userForm: string = this.formLogin.value.username; 
    const passForm: string = this.formLogin.value.password; 
  
    console.log('Datos del formulario:', this.formLogin.value); // Para verificar valores

    if (this.formLogin.valid) { 
      console.log('Formulario válido, guardando...'); 
      try {
        await this.authService.login({ username: userForm, password: passForm }); 
        console.log('Usuario autenticado:', this.authService.isAuthenticated()); 
        this.router.navigate(['/home']); 
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        this.authService.presentToast("Credenciales incorrectas"); 
      }
    } else {
      console.log('Formulario no válido, revisa los campos.'); 
      this.formLogin.markAllAsTouched(); 
    }
  }

  navigateToRegisterPage() {
    this.router.navigate(['/registro']); 
  }
}
