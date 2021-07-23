/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { LoadingController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { TipoUsuario } from 'src/app/models/tipoUsuario.model';
import { UserRegister } from '../../models/usuarioRegister.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  defaultDate: any;
  viewPass = false;
  usuario: UsuarioModel;
  loading: HTMLIonLoadingElement;
  recordarme = false;
  tiposUsuarios: TipoUsuario[];
  isPc = false;
  role = '';
  unamePattern = '^[a-z0-9_-]{8,15}$';
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  userRegister: UserRegister;
  constructor(public formBuilder: FormBuilder,
    private auth: AuthService,
    private usuariosService: UsuariosService,
    private loadingCtrl: LoadingController,
    private funService: FunctionsService,
    private activatedRoute: ActivatedRoute,
    private catalogosService: CatalogosService) {
    this.activatedRoute.params.subscribe(params => {
      console.log('register', params.role);
    });
  }

  ngOnInit() {
    this.createForm();
    this.catalogosService.getTipoUsuarios().subscribe(res => {
      this.tiposUsuarios = res;
      console.log(this.tiposUsuarios);
    });
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      roleUser: ['', Validators.required],
      nameUser: ['', [Validators.required, Validators.minLength(3)]],
      lastNameUser: ['', [Validators.required, Validators.minLength(3)]],
      surNameUser: [''],
      birthDate: ['', Validators.required],
      ocupationUser: ['', Validators.required],
      emailUser: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // visibleEmailUser:[''],
      passwordUser: ['', Validators.required]
    });
  }
  fetchDate(e) {
    const date = new Date(e.target.value).toISOString().substring(0, 10);
    this.registerForm.get('dob').setValue(date, {
      onlyself: true
    });
  }

  get errorCtr() {
    return this.registerForm.controls;
  }
  viewPassFunction(bol) {
    if (bol) {
      this.viewPass = false;
    }
    else {
      this.viewPass = true;
    }
  }
  // onSubmit() {
  //   // console.log(this.registerForm.value.dateUser);
  //   // const dateUser = new Date(this.registerForm.value.dateUser);
  //   // console.log(dateUser);
  //   // this.usuario.dateUser = Number(new Date(dateUser).getTime());
  //   // console.log( this.usuario.dateUser);
  //   console.log(this.registerForm.value);
  //   this.submitted = true;
  //   if (!this.registerForm.valid) {
  //     console.log('Todos los campos son requeridos.');
  //     return false;
  //   } else {
  //     this.presentLoading('Por favor espere');
  //     this.usuario = {
  //       ...this.registerForm.value
  //     };
  //     console.log(this.usuario);
  //     this.auth.nuevoUsuario(this.usuario).subscribe((resp: UserRegister) => {
  //       console.log(this.usuario);
  //       console.log(resp);
  //       if (this.recordarme) {
  //         this.funService.setLocal('email', this.usuario.emailUser);
  //       } else {
  //         this.funService.removeLocal('email');
  //       }
  //       setTimeout(() => {
  //         this.usuario.birthDate = this.funService.getTime(this.usuario.birthDate);
  //         this.usuario.dateCreated = this.funService.getTime();
  //         this.usuario.activatedUser = true;
  //         console.log(this.usuario);
  //         const conexionUser = { email: { visible: true, value: this.usuario.emailUser } };
  //         this.usuario.conexionUser = conexionUser;
  //         this.usuario.emailUser = undefined;
  //         this.usuario.passwordUser = undefined;
  //         this.usuariosService.crearUsuario(this.usuario).subscribe((res: UsuarioModel) => {
  //           setTimeout(() => {
  //             this.userRegister = resp;
  //             res.localId = this.userRegister.localId;
  //             console.log('res', res);
  //             this.usuariosService.updateUser(res.uIdUser, res);
  //             this.loading.dismiss();
  //           }, 1500);
  //           this.funService.navigate('/publications');
  //         },
  //           (err) => {
  //             setTimeout(() => {
  //               this.loading.dismiss();
  //               const msg = err.error.error.message;
  //               this.funService.sendMessage('alertDanger', 'Alert', 'SubTitle', msg);
  //             }, 2000);
  //           });
  //       }, 2000);
  //     },
  //       (err) => {
  //         setTimeout(() => {
  //           this.loading.dismiss();
  //           const msg = err.error.error.message;
  //           this.funService.sendMessage('alertDanger', 'Alert', 'SubTitle', msg);
  //         }, 2000);
  //       });
  //   }
  // }

  async onRegister() {
    console.log(this.registerForm.value);
    const roleUser = this.registerForm.value.roleUser;
    const nameUser = this.registerForm.value.nameUser;
    const lastNameUser = this.registerForm.value.lastNameUser;
    const surNameUser = this.registerForm.value.surNameUser;
    const birthDate = new Date(this.registerForm.value.birthDate).getTime() ;
    const ocupationUser = this.registerForm.value.ocupationUser;
    const email = this.registerForm.value.emailUser;
    const password = this.registerForm.value.passwordUser;
    const ageUser = this.funService.calcularEdad(this.registerForm.value.birthDate);
    const dateCreated = new Date ().getTime();
    const userRegister = {
      roleUser,
      nameUser,
      lastNameUser,
      surNameUser,
      birthDate,
      ocupationUser,
      email,
      password,
      ageUser,
      dateCreated
    };
    console.log(userRegister);

    try {
      const user = await this.auth.register(userRegister);
      if (user) {
        const isVerified = this.auth.isEmailVerified(user);
        console.log('isVerified->', isVerified);
        this.funService.verifyEmail(isVerified);
      } else {

      }
    } catch (error) {
      console.log('error=>', error);
    }
  }
  // Loadding
  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });
    await this.loading.present();
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
}
