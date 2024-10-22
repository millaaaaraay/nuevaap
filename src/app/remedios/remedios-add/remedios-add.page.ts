import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Clremedios } from '../models/CLremedios';

import { DataService } from '../data.service';

@Component({
  selector: 'app-remedios-add',
  templateUrl: './remedios-add.page.html',
  styleUrls: ['./remedios-add.page.scss'],
})
export class RemediosAddPage implements OnInit {

  productForm!: FormGroup;

  remedios : Clremedios = {
    id : 11,
    nombre: 'clonazepam',
    descripcion: 'relajante',
    dosis: '2mg'
  }

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: DataService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.productForm = this.formBuilder.group({
      "rem_nombre": [null, Validators.required],
      'rem_desc': [null, Validators.required],
      'rem_dosis': [null, Validators.required]
    });
  }

  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del Product ADD")

    // Creamos un Loading Controller, Ojo no lo muestra
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Muestra el Loading Controller
    await loading.present();

    // Ejecuta el método del servicio y los suscribe
    await this.restApi.addRemedio(this.remedios)
      .subscribe({
        next: (res) => {
          console.log("Next AddProduct Page",res)
          loading.dismiss(); //Elimina la espera
          if (res== null){ // No viene respuesta del registro
            console.log("Next No Agrego, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;",this.router);
          this.router.navigate(['/product-list']);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error AddProduct Página",err);
          loading.dismiss(); //Elimina la espera
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }
}
