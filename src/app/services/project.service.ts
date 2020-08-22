import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  /*
  * Add project functionality
  * */

  addProject({data}): Promise<any> {
    return this._getCollectionRef().add(data);
  }

  private _getCollectionRef(): AngularFirestoreCollection<any> {
    return this.afs.collection('projects');
  }
}
