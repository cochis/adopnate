/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
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
  private url =  'https://identitytoolkit.googleapis.com/v1';
  userToken: any;
  constructor(private http: HttpClient,
              private funService: FunctionsService) { }


  logout(){

  }
  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    console.log(`${this.url}/accounts:signInWithPassword?key=${this.apikey}`,authData);
    return this.http.post(`${this.url}/accounts:signInWithPassword?key=${this.apikey}`,authData).
    pipe(
      map( resp =>{
        console.log("Entro en el map del pipe login");
        this.saveToken(resp['idToken']);
        return resp;
      })
    );

  }
  nuevoUsuario(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    console.log(`${this.url}/accounts:signUp?key=${this.apikey}`,authData);
    return this.http.post(`${this.url}/accounts:signUp?key=${this.apikey}`,authData).
    pipe(
      map( resp =>{
        // eslint-disable-next-line @typescript-eslint/quotes
        console.log("Entro en el map del pipe nuevop  usuario");
        this.saveToken(resp['idToken']);
        return resp;
      })
    );
  }

  private saveToken(idToken){
    this.userToken = idToken;
    this.funService.setLocal('token',idToken);
  }
  leerToken() {
    if (localStorage.getItem('token')){
      this.userToken = this.funService.getLocal('token');
    }else {
      this.userToken = '';
    }
  return this.userToken;
  }
}
