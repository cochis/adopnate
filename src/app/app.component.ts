/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { AppUpdateService } from './services/app-update.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sw: AppUpdateService) {
    this.sw.checkForUpdates();
  }
  // private swUpdate: SwUpdate,
    // private toastCtrl: ToastController
    ngOnInit() {
    }
  // async ngOnInit() {
  //   this.swUpdate.available.subscribe(async res => {

  //     console.log('Nueva version');
  //     const toast = await this.toastCtrl.create({
  //       message: 'Update available!',
  //       position: 'bottom',
  //       buttons: [{ role: 'cancel', text: 'Reload' }]
  //     });
  //     await toast.present();
  //     toast
  //       .onDidDismiss()
  //       .then(() => this.swUpdate.activateUpdate())
  //       .then(() => window.location.reload());
  //   });
  //   this.swUpdate.checkForUpdate();
  //   setInterval(() => {
  //     console.log('Checando actualizacion');
  //     this.swUpdate.checkForUpdate();
  //   } , 1 * 5 * 1000);
  // }

}
