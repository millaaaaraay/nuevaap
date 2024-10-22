import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { DataService } from '../data.service';
import { Clremedios } from '../models/CLremedios';


@Component({
  selector: 'app-remedios-edit',
  templateUrl: './remedios-edit.page.html',
  styleUrls: ['./remedios-edit.page.scss'],
})


export class RemediosEditPage implements OnInit {
  productForm!: FormGroup;
  remedios: Clremedios = { id: 1, nombre: '', descripcion: '', dosis: '' };
  //remedios: Clremedios[] = Clremedios [] 
  id: any = '';

  constructor(
    private restApi: DataService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);
    // Relizamos lectura
    this.getRemedio(this.route.snapshot.params['id']);
    // Especificamos Validaciones por medio de FormGroup
    this.productForm = this.formBuilder.group({
      'rem_nombre': [null, Validators.required],
      'rem_desc': [null, Validators.required],
      'rem_dosis': [null, Validators.required]
    });
  }
  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit ID:" + this.id)
    this.remedios.id = this.id;
    /*this.producto.nombre = form.prod_name;
    this.producto.descripcion = form.prod_desc;
    this.producto.precio = form.prod_price;
    this.producto.cantidad = form.prod_cantidad;
    */
    // si envio form, envio los nombres del campo del formulario
    //await this.restApi.updateProduct(this.id, form)
    await this.restApi.updateRemedios(this.id, this.remedios).subscribe({
      next: (res) => {
        this.router.navigate(['/product-detail/', this.id]);
      },
      error: (err) => {
        console.error(err);
      },
    });

  }
  async getRemedio(id: number) {
    // Crea Wait
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      // Muestra Wait
      await loading.present();
      // Obtiene el Observable
      await this.restApi.getRemedio(id )
        .subscribe({
          next: (data) => {
            console.log("getProductID data****");
            console.log(data);
            // Si funciona Rescata el los datos
            this.id = data.id;
            // Actualiza los datos
            this.productForm.setValue({
              rem_nombre: data.nombre,
              rem_desc: data.descripcion,
              rem_dosis: data.dosis,

            });
            loading.dismiss();
          }
          , complete: () => { }
          , error: (err) => {
            console.log("getProductID Errr****+");
            console.log(err);
            loading.dismiss();
          }
        })
    }
  
    async presentAlertConfirm(msg: string) {
      const alert = await this.alertController.create({
        header: 'Warning!',
        message: msg,
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              //Si funciona el actualizar navega a listar
              this.router.navigate(['/product-list/']);
            }
          }
        ]
      });
      await alert.present();
    }
}
