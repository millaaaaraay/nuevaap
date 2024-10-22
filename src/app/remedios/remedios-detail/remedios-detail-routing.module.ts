import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemediosDetailPage } from './remedios-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RemediosDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemediosDetailPageRoutingModule {}
