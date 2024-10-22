import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemediosListPage } from './remedios-list.page';

const routes: Routes = [
  {
    path: '',
    component: RemediosListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemediosListPageRoutingModule {}
