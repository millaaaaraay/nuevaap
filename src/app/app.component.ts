import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';  // Importamos Storage
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
}
