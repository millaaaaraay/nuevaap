import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemediosAllPage } from './remedios-all.page';

const routes: Routes = [
  {
    path: '',
    component: RemediosAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemediosAllPageRoutingModule {}
