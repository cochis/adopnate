/* eslint-disable prefer-const */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable use-isnan */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild(IonList) ionList: IonList;
  loading: HTMLIonLoadingElement;
  isPc = false;
  auth = false;
  user: User;
  showPhoto = false;
  showPhotoURL = '';
  showEmail = false;
  showName = true;
  email = '';
  readOnly = true;
  file: any;
  editUserForm: FormGroup;
  public user$: Observable<User> = this.isAuth.afAuth.user;
  constructor(private isAuth: AuthService,
    private usuariosService: UsuariosService,
    private funService: FunctionsService,
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.createForm();
    console.log(this.editUserForm);
    if (this.funService.getLocal('htua')) {
      this.user = this.funService.getLocal('user');
      this.cargarDataAlFormulario();
      if (this.user.photoURL !== '' && this.user.photoURL !== null && this.user.photoURL !== undefined) {
        this.showPhoto = true;
        this.showPhotoURL = this.user.photoURL;
      }
      else {
        this.showPhoto = false;
      }
    } else {
      this.funService.navigate('publications');
    }
  }
  createForm() {
    this.editUserForm = this.formBuilder.group({
      nameUser: [''],
      lastNameUser: [''],
      surNameUser: [''],
      birthDate: [''],
      ageUser: [''],
      email: [''],
      visibleEmail: [true],
      phoneHome: [''],
      visiblePhoneHome: [false],
      phoneCel: [''],
      visibleCelHome: [false],
      ocupationUser: [''],
      roleUser: [''],
      streetAdress: [''],
      numberAdressExt: [''],
      numberAdressInt: [''],
      coloniAdress: [''],
      cityAdress: [''],
      stateAdress: [''],
      cpAdress: ['']
    });
  }

  setdate(date) {
    const d = new Date(date);
    const day = d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate();
    const month = d.getMonth() < 10 ? ('0' + d.getMonth()) : d.getMonth();
    const year = d.getFullYear();
    const res = year + '-' + month + '-' + day;
    return res;
  }
  cargarDataAlFormulario() {
    if (this.user) {
      this.editUserForm.reset({
        nameUser: this.user.nameUser ? this.user.nameUser : '',
        lastNameUser: this.user.lastNameUser ? this.user.lastNameUser : '',
        surNameUser: this.user.surNameUser ? this.user.surNameUser : '',
        birthDate: this.user.birthDate ? this.setdate(this.user.birthDate) : '',
        ageUser: this.user.ageUser ? this.user.ageUser : '',
        email: this.user.email ? this.user.email : '',
        ocupationUser: this.user.ocupationUser ? this.user.ocupationUser : '',
        roleUser: this.user.roleUser ? this.user.roleUser : '',
        visibleEmail: true,
      });
      if (this.user.conexionUser !== null) {
        this.editUserForm.reset({
          nameUser: this.user.nameUser ? this.user.nameUser : '',
          lastNameUser: this.user.lastNameUser ? this.user.lastNameUser : '',
          surNameUser: this.user.surNameUser ? this.user.surNameUser : '',
          birthDate: this.user.birthDate ? this.setdate(this.user.birthDate) : '',
          ageUser: this.user.ageUser ? this.user.ageUser : '',
          email: this.user.email ? this.user.email : '',
          ocupationUser: this.user.ocupationUser ? this.user.ocupationUser : '',
          roleUser: this.user.roleUser ? this.user.roleUser : '',
          visibleEmail: true,
          phoneHome: this.user.conexionUser.phoneHome.value ? this.user.conexionUser.phoneHome.value : '',
          visiblePhoneHome: false,
          phoneCel: this.user.conexionUser.phoneCel.value ? this.user.conexionUser.phoneCel.value : '',
          visibleCelHome: false,
        });
      }
      if (this.user.adressUser !== null) {
        this.editUserForm.reset({
          nameUser: this.user.nameUser ? this.user.nameUser : '',
          lastNameUser: this.user.lastNameUser ? this.user.lastNameUser : '',
          surNameUser: this.user.surNameUser ? this.user.surNameUser : '',
          birthDate: this.user.birthDate ? this.setdate(this.user.birthDate) : '',
          ageUser: this.user.ageUser ? this.user.ageUser : '',
          email: this.user.email ? this.user.email : '',
          ocupationUser: this.user.ocupationUser ? this.user.ocupationUser : '',
          roleUser: this.user.roleUser ? this.user.roleUser : '',
          visibleEmail: true,
          phoneHome: this.user.conexionUser.phoneHome.value ? this.user.conexionUser.phoneHome.value : '',
          visiblePhoneHome: false,
          phoneCel: this.user.conexionUser.phoneCel.value ? this.user.conexionUser.phoneCel.value : '',
          visibleCelHome: false,
          streetAdress: this.user.adressUser.streetAdress ? this.user.adressUser.streetAdress : '',
          numberAdressExt: this.user.adressUser.numberAdressExt ? this.user.adressUser.numberAdressExt : '',
          numberAdressInt: this.user.adressUser.numberAdressInt ? this.user.adressUser.numberAdressInt : '',
          coloniAdress: this.user.adressUser.coloniAdress ? this.user.adressUser.coloniAdress : '',
          cityAdress: this.user.adressUser.cityAdress ? this.user.adressUser.cityAdress : '',
          stateAdress: this.user.adressUser.stateAdress ? this.user.adressUser.stateAdress : '',
          cpAdress: this.user.adressUser.cpAdress ? this.user.adressUser.cpAdress : ''
        });
      }

    }
    else {
      this.editUserForm.reset({
        nameUser: '',
        lastNameUser: '',
        surNameUser: '',
        birthDate: '',
        ageUser: '',
        email: '',
        visibleEmail: '',
        phoneHome: '',
        visiblePhoneHome: '',
        phoneCel: '',
        visibleCelHome: '',
        ocupationUser: '',
        roleUser: '',
        streetAdress: '',
        numberAdressExt: '',
        numberAdressInt: '',
        coloniAdress: '',
        cityAdress: '',
        stateAdress: '',
        cpAdress: ''
      });
    }
  }
  editarPerfil() {
    console.log('editarPerfil');
    console.log(this.editUserForm.value);
  }
  setImage(e) {
    const name = e.target.files[0].name;
    const id = 'imagenPrevisualizacion';
    const archivos = e.target.files;
    const primerArchivo = archivos[0];
    const objectURL = URL.createObjectURL(primerArchivo);
    this.file = primerArchivo;
    let imagenPrevisualizacion: any;
    imagenPrevisualizacion = document.getElementById(id);
    imagenPrevisualizacion.src = objectURL;
  }
  getDate() {
    if (!this.readOnly) {

      console.log(this.editUserForm.value.birthDate);
      let age = 0;
      if (this.funService.calcularEdad(this.editUserForm.value.birthDate) === null ||
        this.funService.calcularEdad(this.editUserForm.value.birthDate) === undefined ||
        this.funService.calcularEdad(this.editUserForm.value.birthDate) === NaN) {
        age = 0;
      } else {
        age = this.funService.calcularEdad(this.editUserForm.value.birthDate);
      }
      this.editUserForm.reset({
        nameUser: this.editUserForm.value.nameUser,
        lastNameUser: this.editUserForm.value.lastNameUser,
        surNameUser: this.editUserForm.value.surNameUser,
        birthDate: this.editUserForm.value.birthDate,
        ageUser: age,
        email: this.editUserForm.value.email,
        ocupationUser: this.editUserForm.value.ocupationUser,
        roleUser: this.editUserForm.value.roleUser,
        visibleEmail: this.editUserForm.value.visibleEmail,
        phoneHome: this.editUserForm.value.phoneHome,
        visiblePhoneHome: this.editUserForm.value.visiblePhoneHome,
        phoneCel: this.editUserForm.value.phoneCel,
        visibleCelHome: this.editUserForm.value.visibleCelHome,
        streetAdress: this.editUserForm.value.streetAdress,
        numberAdressExt: this.editUserForm.value.numberAdressExt,
        numberAdressInt: this.editUserForm.value.numberAdressInt,
        coloniAdress: this.editUserForm.value.coloniAdress,
        cityAdress: this.editUserForm.value.cityAdress,
        stateAdress: this.editUserForm.value.stateAdress,
        cpAdress: this.editUserForm.value.cpAdress,
      });
    }
  }
  edit() {
    console.log('edit');
    console.log(this.editUserForm.value);
    console.log('readOnly', this.readOnly);
    if (this.readOnly) {
      this.readOnly = false;
    } else {
      this.readOnly = true;
    }
    console.log('readOnly', this.readOnly);
  }
  favorite(user: any) {
    console.log('favorite', user);
    this.ionList.closeSlidingItems();
  }

  share(user: any) {
    console.log('share', user);
    this.ionList.closeSlidingItems();
  }

  delete(user: any) {
    console.log('delete', user.name);
    this.ionList.closeSlidingItems();
  }
  regresar() {

    this.funService.navigate('/publications');
  }
  cancel() {
    console.log('edit');
    console.log(this.editUserForm.value);
    console.log('readOnly', this.readOnly);
    if (this.readOnly) {
      this.readOnly = false;
    } else {
      this.readOnly = true;
    }
    console.log('readOnly', this.readOnly);
    this.cargarDataAlFormulario();
  }
  async submit() {
    this.presentLoading('Por favor espere');
    this.user = {
      uid: this.user.uid,
      roleUser: undefined,
      displayName: this.editUserForm.value.nameUser + ' ' + this.editUserForm.value.lastNameUser + ' ' + this.editUserForm.value.surNameUser,
      email: this.user.email,
      emailVerified: this.user.emailVerified,
      nameUser: this.editUserForm.value.nameUser,
      lastNameUser: this.editUserForm.value.lastNameUser,
      surNameUser: this.editUserForm.value.surNameUser,
      ageUser: this.editUserForm.value.ageUser,
      birthDate: this.editUserForm.value.birthDate,
      ocupationUser: this.editUserForm.value.ocupationUser,
      adressUser: {
        streetAdress: this.editUserForm.value.streetAdress,
        numberAdressExt: this.editUserForm.value.numberAdressExt,
        numberAdressInt: this.editUserForm.value.numberAdressInt,
        coloniAdress: this.editUserForm.value.coloniAdress,
        cityAdress: this.editUserForm.value.cityAdress,
        stateAdress: this.editUserForm.value.stateAdress,
        cpAdress: this.editUserForm.value.cpAdress
      },
      conexionUser: {
        phoneHome: {
          visible: true,
          value: this.editUserForm.value.phoneHome
        },
        phoneCel: {
          visible: true,
          value: this.editUserForm.value.phoneCel
        },
        email: {
          visible: true,
          value: this.user.email
        }
      }
    };

    this.readOnly = true;
    this.editUserForm.reset();
    console.log(this.user);
    console.log(this.file);
    if (this.file !== undefined) {
      const image = await this.usuariosService.uploadImage(this.file, 'usersImage', this.user.uid);
      if (image) {
        console.log(image);
        this.user.photoURL = image;
        const userUpdated = this.usuariosService.updateUserData(this.user);
        if (userUpdated) {
          this.funService.removeLocal('user');
          this.loading.dismiss();
          this.funService.sendMessage('Exito', 'Perfil modificado', '', 'Se ha realizado con exito la actualizacion de sus datos.');
          this.funService.navigate('/publications');
        } else {
          this.loading.dismiss();
          this.funService.sendMessage('Error', 'Error', '', 'Por favor de realizar de nuevo la petición, se ha generado un error.');
        }
      } else {
        this.loading.dismiss();
        this.funService.sendMessage('Error', 'Error', '', 'Por favor de realizar de nuevo la petición, error al cargar la imagen.');
      }
    } else {
      const userUpdated = this.usuariosService.updateUserData(this.user);
      if (userUpdated) {
        this.loading.dismiss();
        this.funService.sendMessage('Exito', 'Perfil modificado', '', 'Se ha realizado con exito la actualizacion de sus datos.');
        this.funService.navigate('/publications');
      } else {
        this.loading.dismiss();
        this.funService.sendMessage('Error', 'Error', '', 'Por favor de realizar de nuevo la petición, se ha generado un error.');
      }
    }



  }
  get errorCtr() {
    return this.editUserForm.controls;
  }
  isPcV(isPcm: string) {
    console.log('isPc   publications', isPcm);
    if (isPcm === 'Desktop') {
      this.isPc = true;
    }
    else {
      this.isPc = false;
    }
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });
    await this.loading.present();
  }

}
