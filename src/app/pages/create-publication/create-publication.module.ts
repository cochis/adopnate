import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePublicationPageRoutingModule } from './create-publication-routing.module';

import { CreatePublicationPage } from './create-publication.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePublicationPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [CreatePublicationPage]
})
export class CreatePublicationPageModule {}
