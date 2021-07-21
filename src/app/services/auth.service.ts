/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUsuarioModel, UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { FunctionsService } from './functions.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Crear nuevo usuario
  //    /accounts:signUp?key=[API_KEY]
  //Login
  //   /accounts:signInWithPassword?key=[API_KEY]
  private apikey = 'AIzaSyBF1ZAzkNAnnka432zXTHvmoAtIIMVwjeo';
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private url2 = 'https://adopnate-default-rtdb.firebaseio.com';
  userToken: any;
  constructor(private http: HttpClient,
    private funService: FunctionsService) { }


  logout() {
    this.funService.removeLocal('token');
    this.funService.removeLocal('expira');
    this.funService.removeLocal('localId');
  }
  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}/accounts:signInWithPassword?key=${this.apikey}`, authData).
      pipe(
        map(resp => {
          this.saveToken(resp['idToken']);
          // this.saveLocalId(resp['localId']);
          this.funService.setLocal('user', JSON.stringify(resp));
          return resp;
        })
      );

  }
  nuevoUsuario(usuario: RegisterUsuarioModel) {
    const authData = {
      email: usuario.emailUser,
      password: usuario.passwordUser,
      returnSecureToken: true
    };
    console.log(authData);
    return this.http.post(`${this.url}/accounts:signUp?key=${this.apikey}`, authData).
      pipe(
        map(resp => {
          // eslint-disable-next-line @typescript-eslint/quotes
          this.saveToken(resp['idToken']);
          this.saveLocalId(resp['localId']);
          return resp;
        })
      );
  }

  private saveToken(idToken) {
    this.userToken = idToken;
    this.funService.setLocal('token', idToken);
    const today = new Date();
    today.setSeconds(3600);
    this.funService.setLocal('expira', today.getTime().toString());


  }

  private saveLocalId(localId){
    this.funService.setLocal('localId', localId);
  }
  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = this.funService.getLocal('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuth() {
    console.log('is Auth');
    this.userToken = this.funService.getLocal('token');
    if (this.userToken.length < 2) {
      console.log('no Auth');
      return false;
    }
    const expira = Number(this.funService.getLocal('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    console.log('yes Auth');
    if (expiraDate > new Date()) {
      console.log('yes Auth');
      return true;
    } else {
      console.log('no fro expire Auth');
      return false;
    }
  }
}
