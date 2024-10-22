import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemediosAddPageRoutingModule } from './remedios-add-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // <<========
import { RemediosAddPage } from './remedios-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemediosAddPageRoutingModule,
    ReactiveFormsModule,      // <<========
    HttpClientModule, 
  ],
  declarations: [RemediosAddPage]
})
export class RemediosAddPageModule {}
