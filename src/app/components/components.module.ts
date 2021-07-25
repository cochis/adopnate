import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsComponent } from './forms/forms.component';
import { PublicationComponent } from './publication/publication.component';
import { RefresherComponent } from './refresher/refresher.component';
import { LoadingComponent } from './loading/loading.component';
import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';
import { SliderComponent } from './slider/slider.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
                AlertComponent,
                FooterComponent,
                NavbarComponent,
                FormsComponent,
                PublicationComponent,
                RefresherComponent,
                LoadingComponent,
                AvatarMenuComponent,
                SliderComponent,
                ModalComponent,
                SearchBarComponent

                 ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  exports:      [
                AlertComponent,
                FooterComponent,
                NavbarComponent,
                FormsComponent,
                PublicationComponent,
                RefresherComponent,
                LoadingComponent,
                AvatarMenuComponent,
                SliderComponent,
                ModalComponent,
                SearchBarComponent,
                PipesModule

              ]
})
export class ComponentsModule { }
