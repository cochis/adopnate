import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePublicationPageRoutingModule } from './single-publication-routing.module';

import { SinglePublicationPage } from './single-publication.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglePublicationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SinglePublicationPage]
})
export class SinglePublicationPageModule {}
