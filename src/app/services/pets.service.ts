/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { PetModel } from '../models/pet.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { FunctionsService } from './functions.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class PetService {
  private url = 'https://adopnate-default-rtdb.firebaseio.com';
  pic: any;
  pics = [];
  constructor(private http: HttpClient,
    private storage: AngularFireStorage,
    private funService: FunctionsService,
    public database: AngularFirestore
  ) { }
  crearPet(pet: PetModel) {
    console.log('Antes de mandar a servicio ', pet);
    return this.http.post(`${this.url}/pets.json`, pet).pipe(
      map(async (resp: any) => {
        pet.uid = resp.name;
        for (let i = 0; i < pet.picturesPet.length; i++) {
          const urlPet = await this.uploadImage(pet.picturesPet[i].file, 'pets', pet.uid + (i));
          this.pic = {
            name: pet.uid + (i),
            url: urlPet
          };
          this.pics.push(this.pic);
        }
        pet.picturesPet = this.pics;
        const res = this.updatePet(pet.uid, pet);
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
  updatePetd(id, pet) {
    this.http.put(`${this.url}/pets/${id}/picturesPet.json`, pet.picturesPet).subscribe(res => res,
      err => err);
  }


  getPet(id) {
    const collection = this.database.collection('pets');
    return collection.doc(id).valueChanges();
  }
  getPets() {
    try {
      console.log(' path=>', 'pets');
      const collection = this.database.collection('pets');
      collection.ref.orderBy('dateCreated', 'asc');
      return collection.valueChanges();
    }
    catch (error) {
      console.log('error->', error);
      return error;
    }

  }
  async setPet(pet: PetModel, id): Promise<any> {
    try {
      console.log(pet.picturesPet);

      for (let i = 0; i < pet.picturesPet.length; i++) {
        const urlPet = await this.uploadImage(pet.picturesPet[i].file, 'pets', id + (i));
        this.pic = {
          name: id + (i),
          url: urlPet
        };
        this.pics.push(this.pic);
      }
      pet.picturesPet = this.pics;
      console.log(this.pics);
      console.log(pet);
      const collection = this.database.collection('pets');
      collection.doc(id).set(pet);
      return await this.getPet(id).subscribe((pet: PetModel) => {
        console.log('pet ====>>> ', pet);
        return pet;
      });

    }
    catch (error) {
      console.log('error->', error);
      return error;
    }
  }
  updatePet(id, pet) { }
  setImage(picturesPet, uid) {
    const pics = [];
    for (let i = 0; i < picturesPet.length; i++) {
      const urlPet = this.uploadImage(picturesPet[i].file, 'pets', uid + (i));
      const pic = {
        name: uid + (i),
        url: urlPet
      };
      pics.push(this.pic);
    }
    return pics;
  }

}
