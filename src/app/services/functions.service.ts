/* eslint-disable @typescript-eslint/prefer-for-of */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import * as SecureLS from 'secure-ls';
import { ToastController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { SeoService } from './seo.service';
@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  loading: HTMLIonLoadingElement;
  ls = new SecureLS({ encodingType: 'aes' });
  constructor(private router: Router,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    private modalCtrl: ModalController,
    public database: AngularFirestore,
    private seo: SeoService
  ) { }
  createLinkForCanonicalURL() {
    this.seo.createLinkForCanonicalURL();
  }
  navigateTo(link, role?) {
    console.log(link);
    console.log(role);

    if (role) {
      console.log('rgis');
      this.router.navigate([link], role);
    }
    else {
      this.router.navigate([link]);
    }
  }
  async toast(msn) {
    const toast = await this.toastController.create({
      message: msn,
      duration: 2000
    });
    toast.present();
  }
  async toastOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async sendMessage(type, hdr, subT, msg, lst?) {
    if (lst) {
      let res = '';
      for (let i = 0; i < msg.length; i++) {
        res += ' ' + msg[i].value + ',<br>';
      }
      res.slice(0, -1).trim();
      const alert = await this.alertController.create({
        cssClass: type,
        header: hdr,
        subHeader: subT,
        message: res,
        buttons: ['OK']
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    } else {
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
  }
  async mostrarModal(props) {

    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        props
      }
    });
    await modal.present();
    // const { data } = await modal.onDidDismiss();
    const { data } = await modal.onWillDismiss();
    console.log('onWillDismiss');

    console.log(data);
    return data;

  }


  navigate(link) {
    this.router.navigateByUrl(link);
  }

  setLocal(name, local) {
    this.ls.set(name, local);
  }

  getLocal(name) {
    return this.ls.get(name);
  }

  removeLocal(name) {
    localStorage.removeItem(name);
  }

  clearLocal() {
    localStorage.clear();
    localStorage.clear();
  }
  getTime(time?) {
    if (time) {
      return new Date(time).getTime();
    } else {
      return new Date().getTime();
    }
  }
  calcularEdad(fecha) {
    const hoy = new Date();
    const cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  }
  isUndefined(param) {
    console.log(typeof param);
    console.log(param);
    if (param == null || param === undefined) {
      return null;
    }
    else if (typeof param == 'string') {
      return param = (param !== undefined || param !== '') ? param : '';
    }
    else if (typeof param == 'boolean') {
      return param = (param !== undefined || param !== false) ? param : false;
    }
    else if (typeof param == 'number') {
      return param = (param !== undefined || param !== 0) ? param : 0;
    }
    else if (typeof param == 'object') {
      return param = (param !== undefined || param !== []) ? param : [];
    }
  }
  verifyEmail(isEmailVerified: boolean) {
    console.log('isEmailVerified => ', isEmailVerified);
    if (isEmailVerified) {
      this.navigate('/publications');
    }
    else {
      this.navigate('/verify-email');
    }
  }

  getId() {
    return this.database.createId();

  }
}


