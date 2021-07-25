/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { PetModel } from '../models/pet.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FunctionsService } from './functions.service';
import { LikeModel } from '../models/like.model';
@Injectable({
    providedIn: 'root'
})
export class LikeService {
    private url = 'https://adopnate-default-rtdb.firebaseio.com';
    pic: any;
    pics = [];
    constructor(private http: HttpClient,
        private funService: FunctionsService,
        public database: AngularFirestore
    ) { }
    updateLike(like: LikeModel) {
        console.log('updateUser =>', like);
        const userRef: AngularFirestoreDocument<LikeModel> = this.database.doc(`likes/${like.uid}`);
        const data: LikeModel = {
            uid: this.funService.getId(),
            uidPet: this.funService.isUndefined(like.uidPet),
            uidUser: this.funService.isUndefined(like.uidUser),
            actived: this.funService.isUndefined(like.actived),
            date: this.funService.isUndefined(like.date)
        };
        console.log(data);
        return userRef.set(data, { merge: true });
    }
    getLike(id) {
        const collection = this.database.collection('likes');
        return collection.doc(id).valueChanges();
    }

    getLikes() {
        try {
            const collection = this.database.collection('likes');
            collection.ref.orderBy('dateCreated', 'asc');
            return collection.valueChanges();
        }
        catch (error) {
            console.log('error->', error);
            return error;
        }
    }
    updatePet(id, pet) { }
}
