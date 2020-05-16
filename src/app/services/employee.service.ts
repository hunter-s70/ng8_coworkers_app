import { Injectable } from '@angular/core';
import { Employee } from '../classes/employee';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private afs: AngularFirestore,
  ) { }


  private _getCollectionRef(): AngularFirestoreCollection<any> {
    return this.afs.collection('employees');
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
    return this._getCollectionRef().get().pipe(map((querySnapshot) => {
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
}
