import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsComponent } from './forms/forms.component';



@NgModule({
  declarations: [
                AlertComponent,
                FooterComponent,
                NavbarComponent,
                FormsComponent

                 ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:      [
                AlertComponent,
                FooterComponent,
                NavbarComponent,
                FormsComponent
              ]
})
export class ComponentsModule { }
