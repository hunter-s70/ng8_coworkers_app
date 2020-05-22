import { Injectable } from '@angular/core';
import { Employee } from '../classes/employee';
import { SelectItem } from './select-item';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  skills: string[] = [];
  positions: SelectItem[] = [];


  private _getCollectionRef(): AngularFirestoreCollection<any> {
    return this.afs.collection('employees');
  }

  private _getLimitedCollectionRef({limit}): AngularFirestoreCollection<any> {
    return this.afs.collection('employees', (ref) => {
      return limit ? ref.limit(limit) : ref;
    });
  }

  private _getDocumentRef(docId: string): AngularFirestoreDocument<any> {
    return this.afs.doc(`employees/${docId}`);
  }


  addEmployee({data}): Promise<any> {
    return this._getCollectionRef().add(data);
  }

  updateEmployee({employeeId, data}): Promise<any> {
    return this._getDocumentRef(employeeId).set(data, { merge: true });
  }

  getEmployeesList() {
    return this._getLimitedCollectionRef({limit: 20}).get().pipe(map((querySnapshot) => {
      return this._getEmployeesList(querySnapshot);
    }));
  }

  private _getEmployeesList(querySnapshot): Array<Employee> {
    const employeesList = [];
    querySnapshot.forEach((employee) => {
      const employeeData = employee.data();
      employeesList.push({
        ...employeeData,
        id: employee.id,
        fullName: `${employeeData.firstName} ${employeeData.lastName}`
      });
    });
    return employeesList;
  }

  getEmployeeById(employeeId: string) {
    return this._getDocumentRef(employeeId).get().pipe(
      map((doc) => {
        return {
          exists: doc.exists,
          employee: this._createEmployeeFromData(doc)
        };
      })
    );
  }

  private _createEmployeeFromData(doc) {
    let employee = null;
    if (doc.exists) {
      const {
        firstName,
        lastName,
        email,
        positionId,
        skillsList,
        birthday,
        firstday,
        userPhoto,
        isActive,
        createdAt,
        updatedAt,
        bio
      } = doc.data();
      employee = new Employee(
        firstName,
        lastName,
        email,
        positionId,
        skillsList,
        birthday,
        firstday,
        userPhoto,
        isActive,
        createdAt,
        updatedAt,
        bio);
    }
    return employee;
  }

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
