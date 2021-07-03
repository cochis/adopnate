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


@NgModule({
  declarations: [
                AlertComponent,
                FooterComponent,
                NavbarComponent,
                FormsComponent,
                PublicationComponent,
                RefresherComponent,
                LoadingComponent,
                AvatarMenuComponent

                 ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:      [
                AlertComponent,
                FooterComponent,
                NavbarComponent,
                FormsComponent,
                PublicationComponent,
                RefresherComponent,
                LoadingComponent,
                AvatarMenuComponent

              ]
})
export class ComponentsModule { }
