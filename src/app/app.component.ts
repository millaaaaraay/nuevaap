import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; // Importamos Storage
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  platform: any;
  authService: any;
  sqlite: any;
  dbInstance: any;
  constructor(private storage: Storage, public router: Router) {
    this.initStorage();  // Llamamos a la función para inicializar Storage
    
  }

  async initStorage() {
    await this.storage.create();  // Inicializa el Storage
  }

  goToRemedios() {
    this.router.navigate(['/remedios']);
  }

  goToAddRemedio() {
    this.router.navigate(['/remedios-add']);
  }

  goToDeleteRemedio() {
    this.router.navigate(['/remedios-delete']);
  }

  goToAllRemedios() {
    this.router.navigate(['/remedios-all']);
  }

  goToDetailRemedio() {
    this.router.navigate(['/remedios-detail']);
  }

  goToEditRemedio() {
    this.router.navigate(['/remedios-edit']);
  }

  goToListRemedios() {
    this.router.navigate(['/remedios-list']);
  }
    // Método para inicializar la aplicación
    async initializeApp() {
      await this.platform.ready(); // Esperar a que la plataforma esté lista (esto asegura que todo esté inicializado correctamente)
      const isLoggedIn = await this.authService.isLoggedIn(); // Verificar si el usuario ya ha iniciado sesión
    }
  
    // Método para cerrar sesión
    async logout() {
      this.router.navigateByUrl('/login'); // Redirigir al usuario a la página de login después de cerrar sesión
    }
  
    async crearDB() {
      this.sqlite.create({
        name: 'serviceseekpersistencia.db', // Nombre de la base de datos
        location: 'default', // Ubicación de la base de datos
      }).then((db) => {
        this.dbInstance.setDb(db); // Asignar la instancia de la base de datos a la propiedad dbInstance
        this.dbInstance.createTables();// Crear las tablas si no existen
        console.log('Base de datos creada');
      })
      .catch(error=>{console.error('Falló crear DB',error);});
    }
}
