/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { PetModel } from '../models/pet.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { FunctionsService } from './functions.service';
@Injectable({
  providedIn: 'root'
})
export class PetService {
  private url = 'https://adopnate-default-rtdb.firebaseio.com';
  pic: any;
  pics = [];
  constructor(private http: HttpClient, private storage: AngularFireStorage, private funService: FunctionsService) { }
  crearPet(pet: PetModel) {
    console.log('Antes de mandar a servicio ', pet);
    return this.http.post(`${this.url}/pets.json`, pet).pipe(
      map(async (resp: any) => {
        pet.uIdPet = resp.name;
        for (let i = 0; i < pet.picturesPet.length; i++) {
          const urlPet = await this.uploadImage(pet.picturesPet[i].file, 'pets', pet.uIdPet + (i));
          this.pic = {
            name: pet.uIdPet + (i),
            url: urlPet
          };
          this.pics.push(this.pic);
        }
        pet.picturesPet = this.pics;
        const res = this.updatePet(pet.uIdPet, pet);
        return res;
      })
    );
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
  updatePet(id, pet) {
    this.http.put(`${this.url}/pets/${id}/picturesPet.json`, pet.picturesPet).subscribe(res => res,
      err => err);
  }

}
