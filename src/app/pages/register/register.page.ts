/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { LoadingController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
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
  isPc = false;
  constructor(public formBuilder: FormBuilder,
              private auth: AuthService,
              private usuariosService: UsuariosService,
              private loadingCtrl: LoadingController,
              private funService: FunctionsService) { }

    ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
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
  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      console.log('Todos los campos son requeridos.');
      return false;
    } else {
      this.presentLoading( 'Por favor espere');
      this.usuario = {
        ...this.registerForm.value
      };
      this.auth.nuevoUsuario(this.usuario).subscribe((resp)=>{
        if ( this.recordarme ) {
          this.funService.setLocal('email',this.usuario.email);
        }else {
          this.funService.removeLocal('email');
        }
        setTimeout(() => {
          this.usuario.role = 'USR';
          this.usuario.dateCreated =  new Date().getTime();
          this.usuario.activated = true;
          console.log(this.usuario);
          this.usuariosService.crearUsuario(this.usuario).subscribe((res)=>{
            console.log(res);
            this.loading.dismiss();
           this.funService.navigate('/publications');
          } );
        }, 2000);
      },
      (err)=> {
        setTimeout(() => {
          this.loading.dismiss();
          const msg = err.error.error.message;
          this.funService.sendMessage('alertDanger','Alert','SubTitle',msg);
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
  isPcV(isPcm: string) {
    console.log('isPc   publications', isPcm);
      if (isPcm ==='Desktop'){
        this.isPc= true;
      }
      else {
        this.isPc = false;
      }
    }
}


//ing.@gmail.com
