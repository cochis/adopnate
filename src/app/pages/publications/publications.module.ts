import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicationsPageRoutingModule } from './publications-routing.module';

import { PublicationsPage } from './publications.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicationsPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [PublicationsPage]
})
export class PublicationsPageModule {}
