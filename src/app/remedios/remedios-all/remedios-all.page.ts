import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clremedios } from '../models/CLremedios';

@Component({
  selector: 'app-remedios-all',
  templateUrl: './remedios-all.page.html',
  styleUrls: ['./remedios-all.page.scss'],
})
export class RemediosAllPage implements OnInit {
  msgError = ""
  buttonEliminarDisabled = false
  buttonLeerDisabled = false
  buttonActualizarDisabled = false
  buttonCrearDisabled = false
  producto: Clremedios = { id: 1, nombre: '', descripcion: '', dosis: '' };;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  public id: string = '';


  leer() {}
  eliminar() { }
  grabar() { }
  actualizar() { }
  grabarActualizarAutomatico() { }
}
