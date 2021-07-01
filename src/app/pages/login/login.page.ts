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
  constructor(public formBuilder: FormBuilder,
              private auth: AuthService,
              private loadingCtrl: LoadingController,
              private funService: FunctionsService) { }
  ngOnInit() {
    this.createForm();
    if (   this.funService.getLocal('email') ) {
      console.log('local email');
      console.log(this.funService.getLocal('email'));
      this.loginForm.setValue({
        email:  this.funService.getLocal('email'),
        password: ''
     });
      this.recordarme = true;
    }
  }
  createForm(){
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
  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      console.log('Todos los campos son requeridos.');
      return false;
    } else {
      this.presentLoading( 'Por favor espere');
      console.log(this.loginForm.value);
      console.log(this.loginForm.value);
      this.usuario = {
        ...this.loginForm.value
      };
      this.auth.login(this.usuario).subscribe((resp)=>{
        if ( this.recordarme ) {
          this.funService.setLocal('email',this.usuario.email);
        }else {
          this.funService.removeLocal('email');
        }
        setTimeout(() => {
          this.loading.dismiss();
          console.log(resp);
          this.funService.navigate('/home');
        }, 2000);
      },
      (err)=> {
        setTimeout(() => {
          this.loading.dismiss();
          console.log(err.error.error.message);
          const msg = err.error.error.message;
          this.funService.sendMessage('alertDanger','Alert','SubTitle',msg);
          console.log(err.error.error.message);
        }, 2000);
      });
    }
  }
   // Loadding
   async presentLoading( message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });
    await this.loading.present();
  }
}
