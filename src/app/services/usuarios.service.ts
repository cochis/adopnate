import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario.model';
import { FunctionsService } from './functions.service';
import { finalize, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { retornaDocumentos } from '../helpers/mostrar-documentos';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url = 'https://adopnate-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient,
    private funService: FunctionsService,
    public database: AngularFirestore,
    private storage: AngularFireStorage,) { }
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

  updateUser<UsuarioModel>(id, usuario) {
    this.http.put(`${this.url}/usuarios/${id}.json`, usuario).subscribe(res =>
      // this.funService.setLocal('user', JSON.stringify(res));
       res
    ,
      err => err);
  }
  updateUserData(user: User) {
    console.log('updateUser =>', user);
    console.log('updateUser =>', user.uid);
    const userRef: AngularFirestoreDocument<User> = this.database.doc(`users/${user.uid}`);

    const data: User = {
      uid: this.funService.isUndefined(user.uid),
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
        numberAdressExt: this.funService.isUndefined(user.adressUser.numberAdressExt),
        numberAdressInt: this.funService.isUndefined(user.adressUser.numberAdressInt),
        coloniAdress: this.funService.isUndefined(user.adressUser.coloniAdress),
        cityAdress: this.funService.isUndefined(user.adressUser.cityAdress),
        stateAdress: this.funService.isUndefined(user.adressUser.stateAdress),
        cpAdress: this.funService.isUndefined(user.adressUser.cpAdress)
      },
      conexionUser: {
        phoneHome: {
          visible: true,
          value: this.funService.isUndefined(user.conexionUser.phoneHome.value)
        },
        phoneCel: {
          visible: true,
          value: this.funService.isUndefined(user.conexionUser.phoneCel.value)
        },
        email: {
          visible: true,
          value: this.funService.isUndefined(user.conexionUser.email.value)
        }
      },
      dateCreated: this.funService.isUndefined(user.dateCreated)
    };
    console.log(data);
    return userRef.set(data, { merge: true });
  }

  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(resolve => {
      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const dounloadURL = res;
            resolve(dounloadURL);
            console.log(dounloadURL);
            return dounloadURL;
          });
        })
      )
        .subscribe();
    });
  }

  async createUser(user: User) {
    return await this.http.post(`${this.url}/usuarios.json`, user);
  }

  getUser<UsuarioModel>(id: string) {
    try{
      const collection = this.database.collection('users');
      return collection.doc(id).valueChanges();
    }
    catch (error) {
      console.log('error->', error);
      return error;
    }
  }


}
