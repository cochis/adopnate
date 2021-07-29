import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario.model';
import { FunctionsService } from './functions.service';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { retornaDocumentos } from '../helpers/mostrar-documentos';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url = 'https://adopnate-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient,
    private funService: FunctionsService,
    public database: AngularFirestore) { }
  crearUsuario(usuario: UsuarioModel) {
    return this.http.post(`${this.url}/usuarios.json`, usuario).pipe(
      map((resp: any) => {
        this.funService.setLocal('localId', resp.name);
        usuario.uid = resp.name;
        return usuario;
      })
    );
  }

  getUsers() {
    return this.http.get(`${this.url}/usuarios.json`);
  }
  getUser(id) {
    const collection = this.database.collection('users');
    return collection.doc(id).valueChanges();
  }
  updateUser<UsuarioModel>(id, usuario) {
    this.http.put(`${this.url}/usuarios/${id}.json`, usuario).subscribe(res => {
      this.funService.setLocal('user', JSON.stringify(res));
      return res;
    },
      err => err);
  }
  updateUserData(user: User) {
    console.log('updateUser =>', user);
    console.log('updateUser =>', user.uid);
    const userRef: AngularFirestoreDocument<User> = this.database.doc(`users/${user.uid}`);

    const data: User = {
      uid:  this.funService.isUndefined(user.uid),
      roleUser: '',
      // eslint-disable-next-line max-len
      displayName: this.funService.isUndefined(user.nameUser) + ' ' + this.funService.isUndefined(user.lastNameUser) + ' ' + this.funService.isUndefined(user.surNameUser),
      email: this.funService.isUndefined(user.email),
      emailVerified: this.funService.isUndefined(user.emailVerified),
      nameUser: this.funService.isUndefined(user.nameUser),
      lastNameUser: this.funService.isUndefined(user.lastNameUser),
      surNameUser: this.funService.isUndefined(user.surNameUser),
      ageUser: this.funService.isUndefined(user.ageUser),
      birthDate: this.funService.isUndefined(user.birthDate),
      ocupationUser: this.funService.isUndefined(user.ocupationUser),
      adressUser: {
        streetAdress: this.funService.isUndefined(user.adressUser.streetAdress),
        numberAdressExt:this.funService.isUndefined( user.adressUser.numberAdressExt),
        numberAdressInt: this.funService.isUndefined(user.adressUser.numberAdressInt),
        coloniAdress: this.funService.isUndefined(user.adressUser.coloniAdress),
        cityAdress: this.funService.isUndefined(user.adressUser.cityAdress),
        stateAdress: this.funService.isUndefined(user.adressUser.stateAdress),
        cpAdress: this.funService.isUndefined(user.adressUser.cpAdress)
      },
      conexionUser: {
        phoneHome: {
          visible: true,
          value:this.funService.isUndefined (user.conexionUser.phoneHome.value)
        },
        phoneCel: {
          visible: true,
          value: this.funService.isUndefined(user.conexionUser.phoneCel.value)
        },
        email: {
          visible: true,
          value: this.funService.isUndefined(user.conexionUser.email.value)
        }
      }
    };
    console.log(data);
    return userRef.set(data, { merge: true });
  }


  async createUser(user: User) {
    return await this.http.post(`${this.url}/usuarios.json`, user);
  }

  getDoc(id: string) {
    const collection = this.database.collection('users');
    return collection.doc(id).valueChanges();
  }


}
