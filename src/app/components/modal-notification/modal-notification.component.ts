import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.scss'],
})
export class ModalNotificationComponent implements OnInit {
  @Input() type: any;
  @Input() dataT: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

    console.log('type', this.type);
    console.log('dataT', this.dataT);
  }
  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  salirConArgumentos() {
    this.modalCtrl.dismiss({
      nombre: 'Felipe',
      pais: 'España'
    });
  }
  contact() {
  }
}
