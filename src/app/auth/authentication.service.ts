import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { lastValueFrom } from 'rxjs';
import { BddService } from '../remedios/bdd.service';
import { DataService } from '../remedios/data.service';
import { ClUsuario } from './ClUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private storage: Storage,
    private dataService: DataService, 
    private alertController: AlertController, 
    private bddService: BddService, 
    private router: Router
  ) {
    this.ngOnInit();
  }

  async ngOnInit() {
    await this.storage.create();
  }

  async login(correoUser: string, password: string): Promise<boolean> {
    try {
      // Obtiene el usuario correspondiente al correo proporcionado mediante DataService
      const users: ClUsuario[] = await lastValueFrom(this.dataService.getUsuario(correoUser));

      if (users.length > 0) {
        const userClass = users[0];
        console.log('Auth Usuario:', userClass.nombre, '-', userClass.contrasena);
        
        if (correoUser === userClass.email  && password === userClass.contrasena) {
          await this.storage.set('isLoggedIn', true);
          await this.storage.set('user', userClass.nombre);
          return true;
        } else {
          const alerta = await this.alertController.create({
            header: 'Error',
            message: 'Contraseña incorrecta',
            buttons: ['OK']
          });
          await alerta.present();
          console.log('Contraseña incorrecta');
          return false;
        }
      } else {
        const alerta = await this.alertController.create({
          header: 'Error',
          message: 'Usuario no encontrado',
          buttons: ['OK']
        });
        await alerta.present();
      }
      return false;
    } catch (error) {
      console.error('Error en autenticación: ', error);
      return false;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    return !!(await this.storage.get('isLoggedIn'));
  }

  async logout(): Promise<void> {
    await this.storage.remove('isLoggedIn');
    this.router.navigate(['/login']);
  }

  async getUsuario(): Promise<string> {
    const user = await this.storage.get('user');
    return user ? String(user) : 'Invitado';
  }
}
