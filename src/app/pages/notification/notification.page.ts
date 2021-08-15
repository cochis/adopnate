/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FunctionsService } from 'src/app/services/functions.service';
import { RequestService } from 'src/app/services/request.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PetService } from '../../services/pets.service';
import { ModalController } from '@ionic/angular';
import { ModalNotificationComponent } from '../../components/modal-notification/modal-notification.component';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(private funService: FunctionsService,
    private requestService: RequestService,
    private petsService: PetService,
    private usuariosService: UsuariosService,
    private modalCtrl: ModalController) {

  }
  user: User;
  authenticated = false;
  isPc = false;
  items = [];
  ngOnInit() {
    this.user = this.funService.getLocal('user');
    this.requestService.getRequestByUser(this.user.uid).subscribe((response) => {
      this.items = [];
      response.forEach((item) => {
        this.petsService.getPet(item.petUid).subscribe((resPet => {
          this.usuariosService.getUser(item.userUid).subscribe((resUser => {
            const itm = {
              resPet,
              resUser,
              item
            };
            this.items.push(itm);
          }));
        }));
      });
    },
      (err) => {
        console.log(err);
      });
  }

  checkView(item) {
    // console.log(item);
  }
  viewPerfil(dataP) {
    this.mostrarModal('perfil', dataP);
  }
  viewQuestions(dataQ) {
    this.mostrarModal('questions', dataQ);
  }
  isPcV(isPcm: any) {
    console.log('isPc   publications', isPcm);
    if (isPcm.user) {
      this.user = isPcm.user;
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    if (isPcm.plat === 'Desktop') {
      this.isPc = true;
    }
    else {
      this.isPc = false;
    }
    console.log('User', this.user);
    console.log('authenticated', this.authenticated);
  }

  async mostrarModal(type, dataT) {
    const modal = await this.modalCtrl.create({
      component: ModalNotificationComponent,
      componentProps: {
        type,
        dataT
      }
    });
    await modal.present();

    // const { data } = await modal.onDidDismiss();
    const { data } = await modal.onWillDismiss();
    console.log('onWillDismiss');
    console.log(data);
  }
}
