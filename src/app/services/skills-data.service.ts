import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectItem } from '../interfaces/select-item';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SkillsDataService {

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
  ) { }

  skills: SelectItem[] = [];
  positions: SelectItem[] = [];

  private _getCollectionRef(collectionName): AngularFirestoreCollection<any> {
    return this.afs.collection(collectionName, (ref) => {
      return ref.orderBy('value');
    });
  }

  private _getDocsList(querySnapshot): any {
    return querySnapshot.docs.map((doc) => doc.data());
  }

  /*
  * Skills list
  * */

  getSkillsList(): Subscription {
    return this._getCollectionRef('skills')
      .get()
      .pipe(map((querySnapshot) => this._getDocsList(querySnapshot)))
      .subscribe((skills) => {
        this.skills = skills || [];
      });
  }

  getSkillsValuesList() {
    return this.skills.map((skill) => skill.value);
  }

  /*
  * Positions lists
  * */

  getPositionsList(): Subscription {
    return this._getCollectionRef('positions')
      .get()
      .pipe(map((querySnapshot) => this._getDocsList(querySnapshot)))
      .subscribe((positions) => {
        this.positions = positions || [];
      });
  }

  getPositionNameById(positionId: string): string {
    const position = this.positions.find((pos) => pos.id === positionId);
    return position ? position.value : '';
  }

  /*
  * Export and import
  * */

  exportUserSkillsData() {
    return this.http.get('https://us-central1-coworkers-cc0e8.cloudfunctions.net/exportSkills?skills=true&positions=true');
  }

  importUserSkillsData(data) {
    const batch = this.afs.firestore.batch();
    for (const collection of Object.keys(data)) {
      let documentRef: any;
      data[collection].forEach((item) => {
        documentRef = this.afs.firestore.collection(collection).doc(item.id);
        batch.set(documentRef, item);
      });
    }
    return batch.commit();
  }

  getFileData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const fileBlob = new Blob(file);

      reader.readAsText(fileBlob);

      reader.onload = () => {
        resolve(JSON.parse(reader.result as string));
      };

      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }
}
