import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss'],
})
export class AvatarMenuComponent implements OnInit {
  items = Array(7);
  authenticated = false;
  public user$: Observable<User> = this.auth.afAuth.user;
  constructor(private popoverCtrl: PopoverController,
    private funService: FunctionsService,
    private auth: AuthService) {
    if (this.funService.getLocal('htua')) {
      this.authenticated = this.funService.getLocal('htua');
    } else {
      this.authenticated = false;
    }
    this.funService.setLocal('htua', false);
  }
  ngOnInit() { }

  onClick(valor: number) {
    this.popoverCtrl.dismiss({
      menu: valor
    });
  }
}
