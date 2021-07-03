import { Component, OnInit ,Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  loading: HTMLIonLoadingElement;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() nextStep: any;
  constructor(private loadingCtrl: LoadingController) {
    if ( this.nextStep){
      this.loading.onDidDismiss();
    }
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnInit() {
    this.presentLoading('Cargando  por favor espere');
  }
  async presentLoading( message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });
    await this.loading.present();
  }

}
