import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import * as SecureLS from 'secure-ls';
@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  loading: HTMLIonLoadingElement;
  ls = new SecureLS({ encodingType: 'aes' });
  constructor(private router: Router,
              public alertController: AlertController,
              public loadingCtrl: LoadingController
              ) { }

  navigateTo(link) {
    this.router.navigate([link]);
  }

  async sendMessage(type,hdr,subT,msg) {
    const alert = await this.alertController.create({
      cssClass: type,
      header: hdr,
      subHeader: subT,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  navigate(link){
    this.router.navigateByUrl(link);
  }

  setLocal(name,local) {
    this.ls.set(name,local);
  }

  getLocal(name){
   return this.ls.get(name);
  }

  removeLocal(name){
    localStorage.removeItem(name);
  }

  clearLocal(){
    localStorage.clear();
  }
}


