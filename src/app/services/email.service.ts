/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { PetModel } from '../models/pet.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FunctionsService } from './functions.service';
@Injectable({
    providedIn: 'root'
})
export class EmailService {
    constructor(private http: HttpClient,
        private funService: FunctionsService,
        public database: AngularFirestore
    ) { }
    sendEmail() {
    }
}
