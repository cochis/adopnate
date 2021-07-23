/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';
import { ActionSheetController, PopoverController, Platform } from '@ionic/angular';
import { AvatarMenuComponent } from '../avatar-menu/avatar-menu.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
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
  @Output() propagar = new EventEmitter<string>();
  isPc = false;
  avatarImage = '';
  public user$: Observable<User> = this.auth.afAuth.user;
  constructor(private funService: FunctionsService,
    private actionSheetCtrl: ActionSheetController,
    private auth: AuthService,
    public popoverCtrl: PopoverController,
    public platform: Platform,
  ) {
    this.whatPlatform();
  }
  ngOnInit() {
    this.user$.subscribe(res => {
      if (res !== null) {
        this.authenticated = true;
        console.log(res.photoURL);
        this.avatarImage = (res.photoURL !== '' ? res.photoURL : '/assets/img/user.png');
        console.log(this.avatarImage);
        // this.funService.setLocal('user',res);
      } else {
        this.authenticated = false;
        this.avatarImage = '/assets/img/user.png';
      }
    });
  }
  logOut() {
    this.auth.logOut();
    this.funService.navigate('/login');
  }
  async avatarClick() {
    if (this.authenticated) {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Perfil',
        backdropDismiss: false,
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
              console.log('Publicaciones');
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
        header: 'Perfil',
        backdropDismiss: false,
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
      event: ev,
      translucent: true,
      backdropDismiss: true
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
      this.messageEvent.emit(this.plat);
      this.propagar.emit(this.plat);
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
