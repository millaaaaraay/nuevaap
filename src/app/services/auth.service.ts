import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { DbserviceService } from './dbservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    public dbtaskService: DbserviceService,
    public toastController: ToastController
  ) { 
    this.isLogged();
  }

  isLogged() {
    this.storage.get("USER_DATA").then((response) => {
      if (response != null) {
        this.authState.next(true);
      }
    });
  }

  logout() {
    this.storage.get("USER_DATA").then((data) => {
      data.active = 0;
      this.dbtaskService.updateSesionData(data)
        .then((response) => {
          if (response.rowsAffected >= 1) {
            this.storage.remove("USER_DATA");
            this.router.navigate(['login']);
            this.authState.next(false);
          }
        })
        .catch((error) => console.error(error));
    });
  }

  async login(login: any): Promise<void> {
    return this.dbtaskService.getSesionData(login).then((data) => {
      if (data === undefined) {
        this.presentToast("Credenciales Incorrectas");
        this.authState.next(false); // Asegúrate de que el estado de autenticación se actualice
        return Promise.reject("Credenciales Incorrectas");
      } else {
        data.active = 1;
        return this.dbtaskService.updateSesionData(data)
          .then((response) => {
            this.storage.set("USER_DATA", data);
            this.authState.next(true);
            this.router.navigate(['home']); // Navega a la página deseada después de iniciar sesión
          });
      }
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration ? duration : 2000
    });
    toast.present();
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
