import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemediosEditPage } from './remedios-edit.page';

const routes: Routes = [
  {
    path: '',
    component: RemediosEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemediosEditPageRoutingModule {}
