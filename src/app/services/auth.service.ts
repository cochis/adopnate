import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

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
  constructor(private http: HttpClient) { }


  logout(){

  }
  login(usuario: UsuarioModel){

  }
  nuevoUsuario(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}//accounts:signUp?key=${this.apikey}`,authData);
  }
}
