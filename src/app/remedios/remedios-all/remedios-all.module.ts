import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemediosAllPageRoutingModule } from './remedios-all-routing.module';

import { RemediosAllPage } from './remedios-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemediosAllPageRoutingModule
  ],
  declarations: [RemediosAllPage]
})
export class RemediosAllPageModule {}
