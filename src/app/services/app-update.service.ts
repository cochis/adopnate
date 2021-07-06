import {  Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import {  interval } from 'rxjs';
import { FunctionsService } from './functions.service';
@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(public updates: SwUpdate,
    private funService: FunctionsService) {
    if (updates.isEnabled) {
      interval(60* 60 * 1000).subscribe(() => updates.checkForUpdate()
        .then(() => {
          console.log('Actualizando ...');
          this.funService.toast('Actualizando...');
        }
        ));
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => {
      console.log('Buscando actualizaciones...');
      this.funService.toast('Buscando actualizaciones...');
      this.promptUser();});
  }

  private promptUser(): void {
    console.log('Actualizando a nueva version');
    this.funService.toast('Actualizando a nueva version');
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
