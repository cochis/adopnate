import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(public formBuilder: FormBuilder,
              private auth: AuthService) { }
  ngOnInit() {
    this.createForm();
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
      console.log(this.loginForm.value);
      // this.usuario.name = this.loginForm.values.;
      // this.usuario.name = '';
      // this.usuario.name = '';
      // this.auth.nuevoUsuario(this.usuario).subscribe(resp=>{
      //   console.log(resp);
      // });
    }
  }
}
