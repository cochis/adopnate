import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetadoptionPage } from './getadoption.page';

const routes: Routes = [
  {
    path: '',
    component: GetadoptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetadoptionPageRoutingModule {}
