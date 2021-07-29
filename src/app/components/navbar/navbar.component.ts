/* eslint-disable no-debugger */
/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ActionSheetController, PopoverController, Platform } from '@ionic/angular';
import { AvatarMenuComponent } from '../avatar-menu/avatar-menu.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() titulo;
  plat = '';
  authenticated = false;
  @Output() messageEvent = new EventEmitter<string>();
  @Output() propagar = new EventEmitter<any>();
  isPc = false;
  avatarImage = '';
  user: User;
  countNotifications = 0;
  public user$: Observable<User> = this.auth.afAuth.user;
  constructor(private funService: FunctionsService,
    private actionSheetCtrl: ActionSheetController,
    private auth: AuthService,
    private requestService: RequestService,
    public popoverCtrl: PopoverController,
    public platform: Platform,
  ) {
    this.whatPlatform();
  }
  ngOnInit() {
    this.user$.subscribe(res => {
      if (res !== null) {
        this.user = res;
        this.requestService.getRequestByUser(this.user.uid).subscribe((response) => {
          this.countNotifications = 0;
          response.forEach((item) => {
            if (!item.viewNotification) {
              this.countNotifications++;
            }
          });
          this.authenticated = true;
          this.avatarImage = (res.photoURL !== null ? res.photoURL : '/assets/img/user.png');
        },
          (err) => {
            console.log(err);
          });
      } else {
        this.authenticated = false;
        this.avatarImage = '/assets/img/user.png';
      }
    });
  }
  logOut() {
    this.auth.logOut();
    this.funService.clearLocal();
    this.funService.navigate('/login');
  }
  async avatarClick() {
    if (this.authenticated) {
      const actionSheet = await this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Ayuda',
            icon: 'share-outline',
            handler: () => {
              console.log('Share clicked');
            }
          }, {
            text: 'Editar perfil',
            icon: 'color-wand',
            handler: () => {
              this.funService.navigateTo('/perfil');
            }
          }, {
            text: 'Favoritos',
            icon: 'heart-circle',
            handler: () => {
              console.log('Favorite clicked');
            }
          }, {
            text: 'Publicaciones',
            icon: 'bookmarks',
            handler: () => {
              // console.log('Publicaciones');
              this.funService.navigateTo('/publications');
            }
          }, {
            text: 'Salir',
            icon: 'exit',
            role: 'cancel',
            handler: () => {
              console.log('Salir');
              this.logOut();
            }
          }
        ]
      });
      await actionSheet.present();

    } else {
      const actionSheet = await this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Ingresar',
            icon: 'log-in',
            handler: () => {
              this.funService.navigateTo('/login');
            }
          }, {
            text: 'Registrarse',
            icon: 'create',
            handler: () => {
              this.funService.navigateTo('/register');
            }
          }, {
            text: 'Publicaciones',
            icon: 'bookmarks',
            handler: () => {
              this.funService.navigateTo('/publications');
            }
          }
        ]
      });
      await actionSheet.present();
    }
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: AvatarMenuComponent,
      translucent: true,
      backdropDismiss: true,
      animated: true
    });
    await popover.present();
    const { data } = await popover.onWillDismiss();
    this.optMenuDektop(Number(data.menu));
  }
  whatPlatform() {
    setTimeout(() => {
      if (this.platform.is('desktop')) {
        this.plat = 'desktop';
        this.isPc = true;
      } else {
        this.plat = 'mobile';
        this.isPc = false;
      }
      const res = {
        plat: this.plat,
        user: this.user
      };

      // this.messageEvent.emit(res);
      this.propagar.emit(res);
    }, 1500);
  }
  optMenuDektop(data) {
    switch (data) {
      case 1:
        console.log('help');
        break;
      case 2:
        console.log('editPerfil');
        this.funService.navigateTo('/perfil');
        break;
      case 3:
        console.log('favoritos');
        break;
      case 4:
        console.log('Salir');
        this.logOut();
        break;
      case 5:
        console.log('login');
        this.funService.navigateTo('/login');
        break;
      case 6:
        console.log('register');
        this.funService.navigateTo('/register');
        break;
      case 7:
        console.log('Publicaciones');
        this.funService.navigateTo('/publications');
        break;
      default:
        break;
    }
  }
}
