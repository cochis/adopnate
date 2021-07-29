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
