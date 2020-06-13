import { Injectable } from '@angular/core';
import { SelectItem } from '../interfaces/select-item';
import { Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SkillsDataService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  skills: string[] = [];
  positions: SelectItem[] = [];

  private _getSelectorsRef(): AngularFirestoreCollection<any> {
    return this.afs.collection('selectors');
  }

  getSkillsList(): Subscription {
    const skillsRef: AngularFirestoreDocument<any> = this._getSelectorsRef().doc('skills');
    return skillsRef.get().subscribe((doc) => {
      this.skills = doc.data().list;
    });
  }

  getPositionsList(): Subscription {
    const positionsRef: AngularFirestoreDocument<any> = this._getSelectorsRef().doc('positions');
    return positionsRef.get().subscribe((doc) => {
      this.positions = doc.data().list;
    });
  }

  getPositionNameById(positionId: string): string {
    if (this.positions && this.positions.length) {
      const position = this.positions.find((pos) => pos.id === positionId);
      return position.value || '';
    }
    return '';
  }
}
