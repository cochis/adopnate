import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RememberpassPage } from './rememberpass.page';

const routes: Routes = [
  {
    path: '',
    component: RememberpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RememberpassPageRoutingModule {}
