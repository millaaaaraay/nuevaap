import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemediosListPageRoutingModule } from './remedios-list-routing.module';

import { RemediosListPage } from './remedios-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemediosListPageRoutingModule
  ],
  declarations: [RemediosListPage]
})
export class RemediosListPageModule {}
