import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Clremedios } from '../models/CLremedios';

import { DataService } from '../data.service';


@Component({
  selector: 'app-remedios-list',
  templateUrl: './remedios-list.page.html',
  styleUrls: ['./remedios-list.page.scss'],
})
export class RemediosListPage implements OnInit {

  remedios: Clremedios[] = [];

  constructor(
    public restApi: DataService
    , public loadingController: LoadingController
    , public router: Router
  ) { }

  ngOnInit() {
    this.getRemedios
  }
  async getRemedios() {
    console.log("Entrando :getProducts");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getRemedios()
      .subscribe({
        next: (res) => {
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.remedios = res;
          console.log("thisProductos:",this.remedios);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
  // Si da error, imprimo en consola.
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }
}
