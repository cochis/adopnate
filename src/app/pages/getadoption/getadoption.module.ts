import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetadoptionPageRoutingModule } from './getadoption-routing.module';

import { GetadoptionPage } from './getadoption.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetadoptionPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [GetadoptionPage]
})
export class GetadoptionPageModule {}
