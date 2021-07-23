import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss'],
})
export class AvatarMenuComponent implements OnInit {
  items = Array(7);
  authenticated= false;
  public user$: Observable<User> = this.auth.afAuth.user;
  constructor( private popoverCtrl: PopoverController,
               private auth: AuthService) {
                this.user$.subscribe(res => {
                  if (res !== null) {
                    this.authenticated = true;
                  } else {
                    this.authenticated = false;
                  }
                });
   }
  ngOnInit() {}

  onClick( valor: number ) {
    this.popoverCtrl.dismiss({
      menu: valor
    });
  }
}
