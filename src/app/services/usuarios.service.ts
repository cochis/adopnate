import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario.model';
import { map } from'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url  = 'https://adopnate-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) { }
  crearUsuario( usuario: UsuarioModel) {
    return this.http.post(`${this.url}/usuarios.json`, usuario).pipe(
      map((resp: any)=>{
        usuario.id =resp.name;
        return usuario;
      })
    );
  }
}
