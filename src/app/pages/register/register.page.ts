/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(public formBuilder: FormBuilder,
              private auth: AuthService) { }

    ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
      // ,
      // dob: [],
      // phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
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
    console.log('bol', bol);
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
      console.log(this.registerForm.value);
      this.usuario = {
        ...this.registerForm.value
      }
      this.auth.nuevoUsuario(this.usuario).subscribe(resp=>{
        console.log(resp);
      })

    }
  }
}
