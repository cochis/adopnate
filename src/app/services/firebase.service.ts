import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { retornaDocumentos } from '../helpers/mostrar-documentos';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public database: AngularFirestore) { }

  async createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);

  }

  getDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }
  updateDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);

  }

  getId() {
    return this.database.createId();

  }
  getCollection(path: string) {
    try {
      console.log(' path=>', path);
      const collection = this.database.collection(path);
      collection.ref.orderBy('dateCreated', 'asc');
      return collection.valueChanges();
    }
    catch (error) {
      console.log('error->', error);
      return error;
    }
  }

  getCollectionPagination(path: string, lastDocument: number) {
    const collection = this.database.collection(path);
    const query = collection.ref
      .orderBy('dateCreatePostToLike', 'desc')
      .startAfter(lastDocument);
    query
      .limit(20)
      .get()
      .then((snap) => {
        retornaDocumentos(snap);
      });
  }
}


