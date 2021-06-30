import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RememberpassPageRoutingModule } from './rememberpass-routing.module';

import { RememberpassPage } from './rememberpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RememberpassPageRoutingModule
  ],
  declarations: [RememberpassPage]
})
export class RememberpassPageModule {}
