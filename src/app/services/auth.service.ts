/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUsuarioModel, UsuarioModel } from '../models/usuario.model';
import { map, switchMap } from 'rxjs/operators';
import { FunctionsService } from './functions.service';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apikey = 'AIzaSyBF1ZAzkNAnnka432zXTHvmoAtIIMVwjeo';
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private url2 = 'https://adopnate-default-rtdb.firebaseio.com';
  userToken: any;
  public user$: Observable<User>;
  userUpdated: User;
  constructor(private http: HttpClient,
    private funService: FunctionsService,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private userService: UsuariosService) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          return of(null);
        }
      })
    );
  }

  isAuth() {
    // console.log('is Auth');
    this.userToken = this.funService.getLocal('token');
    if (this.userToken.length < 2) {
      // console.log('no Auth');
      return false;
    }
    const expira = Number(this.funService.getLocal('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    // console.log('yes Auth');
    if (expiraDate > new Date()) {
      console.log('yes Auth');
      return true;
    } else {
      console.log('no fro expire Auth');
      return false;
    }
  }
  async logOut(): Promise<void> {
    try {
      // const secureLocal = this.funService.getLocal('_secure__ls__metadata');
      this.funService.clearLocal();
      // this.funService.setLocal('_secure__ls__metadata', secureLocal);
      await this.afAuth.signOut();

    }
    catch (error) {
      console.log('error->', error);
    }
  }
  async logIn(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      this.funService.setLocal('user', user);
      return user;
    }
    catch (error) {
      console.log('error->', error);
    }
  }
  async register(userRegister): Promise<User> {
    console.log(userRegister);
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(userRegister.email, userRegister.password);
      console.log(user);
      userRegister.uid = user.uid;
      userRegister.email = user.email;
      userRegister.emailVerified = user.emailVerified;
      userRegister.displayName = user.displayName;
      console.log(userRegister);
      this.funService.setLocal('user', userRegister);
      this.updateUserData(userRegister);
      await this.sendVerificationEmail();
      return user;
    }
    catch (error) {
      console.log('error->', error);
    }
  }
  async loginGoogle(): Promise<User> {
    console.log('logi nGoogle');
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      console.log('user ====>>> ', user);
      this.updateUserData(user);
      this.userService.getDoc(user.uid).subscribe((usr) => {
        console.log('usr ====>>> ', usr);
        this.funService.setLocal('user', usr);
      });
      return user;
    }
    catch (error) {
      console.log('error->', error);
    }
  }
  async resetPassword(email: string): Promise<void> {
    try {
      console.log(' email rester=>', email);
      return this.afAuth.sendPasswordResetEmail(email);
    }
    catch (error) {
      console.log('error->', error);
    }
  }
  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    }
    catch (error) {
      console.log('error->', error);
    }
  }
  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }
  private updateUserData(user: User) {
    console.log('updateUser =>', user);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: this.funService.isUndefined(user.uid),
      roleUser: this.funService.isUndefined(user.roleUser),
      email: this.funService.isUndefined(user.email),
      emailVerified: this.funService.isUndefined(user.emailVerified),
      displayName: this.funService.isUndefined(user.displayName),
      nameUser: this.funService.isUndefined(user.nameUser),
      lastNameUser: this.funService.isUndefined(user.lastNameUser),
      surNameUser: this.funService.isUndefined(user.surNameUser),
      ageUser: this.funService.isUndefined(this.funService.calcularEdad(user.birthDate)),
      birthDate: this.funService.isUndefined(user.birthDate),
      ocupationUser: this.funService.isUndefined(user.ocupationUser),
      adressUser: this.funService.isUndefined(user.adressUser),
      conexionUser: this.funService.isUndefined(user.conexionUser),
      dateCreated: this.funService.isUndefined(user.dateCreated)
    };
    console.log(data);
    return userRef.set(data, { merge: true });
  }
}
