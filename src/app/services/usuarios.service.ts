import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario.model';
import { FunctionsService } from './functions.service';
import { map } from'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url  = 'https://adopnate-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient,
              private funService: FunctionsService ) { }
  crearUsuario( usuario: UsuarioModel) {
    return this.http.post(`${this.url}/usuarios.json`, usuario).pipe(
      map((resp: any)=>{
        this.funService.setLocal('localId', resp.name);
        usuario.uIdUser =resp.name;
        return usuario;
      })
    );
  }

  getUsers() {
    return this.http.get(`${this.url}/usuarios.json`);
  }
  getUser(id) {
    return this.http.get(`${this.url}/usuarios/${id}.json`);
  }
  updateUser<UsuarioModel>(id, usuario) {
    this.http.put(`${this.url}/usuarios/${id}.json`, usuario).subscribe(res => {
      this.funService.setLocal('user', JSON.stringify(res));
      return res;
    },
      err => err);
  }
}
