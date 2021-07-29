import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  defaultDate: any;
  viewPass = false;
  usuario: UsuarioModel;
  loading: HTMLIonLoadingElement;
  recordarme = false;
  isPc = false;
  authenticated = false;
  constructor(public formBuilder: FormBuilder,
    private auth: AuthService,
    private loadingCtrl: LoadingController,
    private funService: FunctionsService) { }
  ngOnInit() {
    this.createForm();
    if (this.funService.getLocal('email')) {
      this.loginForm.setValue({
        email: this.funService.getLocal('email'),
        password: ''
      });
      this.recordarme = true;
    }
  }
  createForm() {
    this.usuario = new UsuarioModel();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
    });
  }


  get errorCtr() {
    return this.loginForm.controls;
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
  //   this.submitted = true;
  //   if (!this.loginForm.valid) {
  //     return false;
  //   } else {
  //     this.presentLoading('Por favor espere');
  //     this.usuario = {
  //       ...this.loginForm.value
  //     };
  //     this.auth.login(this.usuario).subscribe((resp) => {
  //       console.log(resp);
  //       // if ( this.recordarme ) {
  //       this.funService.setLocal('email', this.loginForm.value.email);
  //       // }else {
  //       //   this.funService.removeLocal('email');
  //       // }
  //       setTimeout(() => {
  //         this.loading.dismiss();
  //         this.funService.navigate('/publications');
  //       }, 3000);
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

  async onLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    console.log('email =>', email);
    console.log('password =>', password);
    try {
      const user = await this.auth.logIn(email, password);
      console.log('login user ',user);
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
  async loginGoogle() {
    try {
      const user = await this.auth.loginGoogle();
      if (user) {
        const isVerified = this.auth.isEmailVerified(user);
        console.log('isVerified->', isVerified);
        this.funService.verifyEmail(isVerified);
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
