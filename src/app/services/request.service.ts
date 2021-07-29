/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FunctionsService } from './functions.service';
import { RequestModel } from '../models/request.model';
@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private url = 'https://adopnate-default-rtdb.firebaseio.com';
    constructor(private http: HttpClient,
        private funService: FunctionsService,
        public database: AngularFirestore
    ) { }
    updateRequest(request: RequestModel) {
        // console.log('updateUser =>', Request);
        const userRef: AngularFirestoreDocument<RequestModel> = this.database.doc(`requests/${request.uid}`);
        const data: RequestModel = {
            uid: this.funService.isUndefined(request.uid),
            userUid: this.funService.isUndefined(request.userUid),
            petUid: this.funService.isUndefined(request.petUid),
            dateBegin: this.funService.isUndefined(request.dateBegin),
            viewNotification: this.funService.isUndefined(request.viewNotification),
            contact: this.funService.isUndefined(request.contact),
            dateContact: this.funService.isUndefined(request.dateContact),
            dateEnd: this.funService.isUndefined(request.dateEnd),
            qts1: this.funService.isUndefined(request.qts1),
            qts2: this.funService.isUndefined(request.qts2),
            qts3: this.funService.isUndefined(request.qts3),
            qts4: this.funService.isUndefined(request.qts4),
            qts5: this.funService.isUndefined(request.qts5),
            qts6: this.funService.isUndefined(request.qts6),
            qts7: this.funService.isUndefined(request.qts7),
            qts8: this.funService.isUndefined(request.qts8),
            qts9: this.funService.isUndefined(request.qts9),
            qts10: this.funService.isUndefined(request.qts10),
            qts11: this.funService.isUndefined(request.qts11),
            adopted: this.funService.isUndefined(request.adopted)
        };
        // console.log(data);
        return userRef.set(data, { merge: true });
    }
    getRequest(id) {
        const collection = this.database.collection('requests');
        return collection.doc(id).valueChanges();
    }

    getRequests() {
        try {
            const collection = this.database.collection('requests');
            collection.ref.orderBy('dateCreated', 'asc');
            return collection.valueChanges();
        }
        catch (error) {
            console.log('error->', error);
            return error;
        }
    }


    getRequestByUser(id) {
        try {
            const collection = this.database.collection('requests', ref => ref.where('userUid', '==', id)).valueChanges();
            return collection;
        }
        catch (error) {
            console.log('error->', error);
            return error;
        }
    }
    getrequestByPet(id) {
        try {
            const collection = this.database.collection('requests', ref => ref.where('uidPet', '==', id)).valueChanges();
            return collection;
        }
        catch (error) {
            console.log('error->', error);
            return error;
        }
    }

    getRequestUnique(uidPet, uidUser) {
        try {
            const collection = this.database.collection('requests', ref => ref.where('uidPet', '==', uidPet).where('uidUser', '==', uidUser)).valueChanges();
            return collection;
        }
        catch (error) {
            console.log('error->', error);
            return error;
        }

    }
    updatePet(id, pet) { }
}
