import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Definición de los datos de la tabla
export interface MedicacionElement {
  fecha: string;
  medicacion: string;
  dosis: string;
}

// Datos de ejemplo para la tabla
const ELEMENT_DATA: MedicacionElement[] = [
  { fecha: '2024-09-10', medicacion: 'Paracetamol', dosis: '500 mg' },
  { fecha: '2024-09-11', medicacion: 'Ibuprofeno', dosis: '200 mg' },
  { fecha: '2024-09-12', medicacion: 'Aspirina', dosis: '300 mg' },
];

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  // Propiedad para el correo electrónico
  email: string = '';

  // Columnas de la tabla
  displayedColumns: string[] = ['fecha', 'medicacion', 'dosis'];
  dataSource = ELEMENT_DATA;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.email = navigation.extras.state['email'];
    }
  }

  ngOnInit() {}
}
