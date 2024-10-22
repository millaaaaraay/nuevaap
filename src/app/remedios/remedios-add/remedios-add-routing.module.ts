import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemediosAddPage } from './remedios-add.page';

const routes: Routes = [
  {
    path: '',
    component: RemediosAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemediosAddPageRoutingModule {}
