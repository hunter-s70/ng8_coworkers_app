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

  exportUserSkillsData() {
    return this.http.get('https://us-central1-coworkers-cc0e8.cloudfunctions.net/exportSkills?skills=true&positions=true');
  }
}
