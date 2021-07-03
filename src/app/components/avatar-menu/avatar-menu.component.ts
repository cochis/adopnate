import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss'],
})
export class AvatarMenuComponent implements OnInit {
  items = Array(7);
  authenticated= false;
  constructor( private popoverCtrl: PopoverController,
               private auth: AuthService) {
    this.authenticated = this.auth.isAuth();
   }
  ngOnInit() {}

  onClick( valor: number ) {
    this.popoverCtrl.dismiss({
      menu: valor
    });
  }
}
