import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario.model';
import { FunctionsService } from './functions.service';
import { map } from'rxjs/operators';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { retornaDocumentos } from '../helpers/mostrar-documentos';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url  = 'https://adopnate-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient,
              private funService: FunctionsService,
              public database: AngularFirestore ) { }
  crearUsuario( usuario: UsuarioModel) {
    return this.http.post(`${this.url}/usuarios.json`, usuario).pipe(
      map((resp: any)=>{
        this.funService.setLocal('localId', resp.name);
        usuario.uid =resp.name;
        return usuario;
      })
    );
  }

  getUsers() {
    return this.http.get(`${this.url}/usuarios.json`);
  }
  getUser(id) {
    console.log('entro get user ' , id);
    return this.http.get(`${this.url}/usuarios/${id}.json`);
  }
  updateUser<UsuarioModel>(id, usuario) {
    this.http.put(`${this.url}/usuarios/${id}.json`, usuario).subscribe(res => {
      this.funService.setLocal('user', JSON.stringify(res));
      return res;
    },
      err => err);
  }


  async createUser( user: User) {
    return await this.http.post(`${this.url}/usuarios.json`, user);
  }

  getDoc(id: string) {
    const collection = this.database.collection('users');
    return collection.doc(id).valueChanges();
  }


}
